const Joi = require('joi');

const {
    findOneUserById,
    createOneUser,
    existEmailUser,
    updateOneUser,
    deleteOneUser,
    hashPassword,
    verifyPassword,
    // findFavoriteByUserId,
    findManyUser,
    // findVoteByUserId,
} = require('../models/user.model');



async function awesomeDataHandler(promise) {
    try {
      const data = await promise;
      return [data, null];
    } catch (error) {
      console.error(error);
      return [null, error];
    }
  }
  
  const getClients = async (req, res) => {
    const id = req.clientId ? req.clientId : req.params.id;
    if (id) {
      const [data, error] = await awesomeDataHandler(findOneUserById(id));
      if (data) {
        return data[0].length ? res.json(data[0][0]) : res.status(404).send('User not found');
      }
      return res.status(500).send(error.message);
    }
    const [data, error] = await awesomeDataHandler(findManyUser());
    return data ? res.json(data[0]) : res.status(500).send(error.message);
  };


  const createOneClient = async (req, res, next) => {
    const { pseudo, email, clearPassword } = req.body;
    const [data, error] = await awesomeDataHandler(existEmailUser(email));
    if (data[0][0]) {
      res.status(500).send('This user is already used');
    } else {
      let validationData = null;
      validationData = Joi.object({
        pseudo: Joi.string().alphanum(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { alow: ['com', 'fr', 'net'] } })
          .required(),
        clearPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;!@#$%^&*])(?=.{8,})')).min(8).max(32).required(),
      }).validate({ pseudo, email, clearPassword }, { abortEarly: false }).error;
      if (validationData) {
        res.status(500).send(`${[validationData]} invalid data`);
      } else {
        const hashedPassword = await hashPassword(clearPassword);
        const user = { pseudo, email, password: hashedPassword };
        const [data1, error1] = await awesomeDataHandler(createOneUser(user));
        if (!error) {
          req.clientId = [data1].insertId;
          next(req.clientId);
        }
      }
    }
  };
  
  const updateOneClient = (req, res, next) => {
    const { pseudo, email, password } = req.body;
    existEmailUser(email).then(async ([result]) => {
      if (result[0]) {
        res.status(500).send('This user is already used');
      } else {
        let validationData = null;
        validationData = Joi.object({
          pseudo: Joi.string().alphanum(),
          email: Joi.string().email({ minDomainSegments: 2, tlds: { alow: ['com', 'fr', 'net'] } }),
          password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;!@#$%^&*])(?=.{8,})')),
        }).validate({ pseudo, email, password }, { abortEarly: false }).error;
        if (validationData) {
          res.status(500).send('Invalid data');
        } else {
          if (req.body.password) {
            req.body.password = await hashPassword(password);
          }
          updateOneUser(req.body, req.params.id)
            .then(([results]) => {
              if (results.affectedRows === 0) {
                return res.status(404).send('Client not found');
              }
              return next();
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      }
    });
  };
  
  const verifyCredentials = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const [users] = await existEmailUser(email);
      console.log(users);
      if (!users) {
        return res.status(404).send('User not found');
      }
      const [user] = users;
      const passwordIsValid = await verifyPassword(user.password, password);
      console.log(passwordIsValid);
      if (passwordIsValid) {
        req.email = user.email;
        return next();
      }
      return res.status(401).send('Your email or your password is wrong');
    } catch (err) {
      return res.status(500).send(`ERROR ${err}`);
    }
  };
  
  const deleteOneClient = (req, res) => {
    deleteOneUser(req.params.id)
      .then(([results]) => {
        if (results.affetedRows === 0) {
          return res.status(404).send('Client not found');
        }
        return res.sendStatus(204);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  };


module.exports = {
    getClients,
    createOneClient,
    updateOneClient,
    deleteOneClient,
    verifyCredentials,
  };
  