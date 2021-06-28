const Joi = require('joi');

const {
    findOneUserById,
    findFavoriteByUserId
    createOneUser,
    verifExistDataUser,
    existEmailUser,
    updateOneUser,
    deleteOneUser,
    hashPassword,
    verifyPassword,
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
      const [data, error] = await awesomeDataHandler(findOneById(id));
      if (data) {
        return data[0].length ? res.json(data[0][0]) : res.status(404).send('User not found');
      }
      return res.status(500).send(error.message);
    }
    const [data, error] = await awesomeDataHandler(findAllClient());
    return data ? res.json(data[0]) : res.status(500).send(error.message);
  };


  const createOneClient = async (req, res, next) => {
    const { firstname, lastname, email, password, phone, adress, role } = req.body;
    const [data, error] = await awesomeDataHandler(verifyEmail(email));
    if (data[0][0]) {
      res.status(500).send('Ce client existe déja');
    } else {
      let validationData = null;
      validationData = Joi.object({
        firstname: Joi.string().alphanum().required(),
        lastname: Joi.string().alphanum().required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { alow: ['com', 'fr', 'net'] } })
          .required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;!@#$%^&*])(?=.{8,})')).min(8).max(32).required(),
        phone: Joi.string().max(10).required(),
        adress: Joi.string().required(),
        role: Joi.boolean().truthy('admin').falsy('client'),
      }).validate({ firstname, lastname, email, password, phone, adress, role }, { abortEarly: false }).error;
      if (validationData) {
        res.status(500).send(`${[validationData]} Invalide donné`);
      } else {
        const hashedPassword = await hashPassword(password);
        const user = { firstname, lastname, email, hashedPassword, phone, adress, role };
        const [data1, error1] = await awesomeDataHandler(createOne(user));
        if (!error) {
          req.clientId = [data1].insertId;
          next(req.clientId);
        }
      }
    }
  };
  
  const updateOneClient = (req, res, next) => {
    const { firstname, lastname, email, hashedPassword, phone, adress } = req.body;
    verifyEmail(email).then(async ([result]) => {
      if (result[0]) {
        res.status(500).send('Ce client existe déja');
      } else {
        let validationData = null;
        validationData = Joi.object({
          firstname: Joi.string().alphanum(),
          lastname: Joi.string().alphanum(),
          email: Joi.string().email({ minDomainSegments: 2, tlds: { alow: ['com', 'fr', 'net'] } }),
          hashedPassword: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;!@#$%^&*])(?=.{8,})')),
          phone: Joi.string().max(10),
          adress: Joi.string(),
        }).validate({ firstname, lastname, email, hashedPassword, phone, adress }, { abortEarly: false }).error;
        if (validationData) {
          res.status(500).send('Invalide data');
        } else {
          if (req.body.hashedPassword) {
            req.body.hashedPassword = await hashPassword(hashedPassword);
          }
          updateOne(req.body, req.params.id)
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
      const [users] = await verifyEmail(email);
      console.log(users);
      if (!users) {
        return res.status(404).send('User not found');
      }
      const [user] = users;
      const passwordIsValid = await verifyPassword(user.hashedPassword, password);
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
    deleteOne(req.params.id)
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
  