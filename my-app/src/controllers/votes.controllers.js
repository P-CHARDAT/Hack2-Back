const {
  findManyVotes,
  findOneVotesById,
  createOneVotes,
  updateOneVotes,
  deleteOneVotes,
} = require("../models/votes.model");

const getVotes = (req, res) => {
  const id = req.votesId ? req.votesId : req.params.id;
  if (id) {
    const status = req.votesId ? 201 : 200;
    return findOneVotesById(id)
      .then((results) => {
        const votes = results[0];
        res.status(status).json(votes[0]);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
  return findManyVotes()
    .then((results) => {
      const votes = results[0];
      res.json(votes);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createVotes = (req, res, next) => {
  createOneVotes(req)
    .then(([results]) => {
      req.votesId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateVotes = (req, res, next) => {
  updateOneVotes(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send(`This votes doesn't exist`);
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteVotes = (req, res) => {
  deleteOneVotes(req.params.id)
    .then(([results]) => {
      if (results.affetedRows === 0) {
        return res.status(404).send("Votes not found");
      }
      return res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getVotes,
  createVotes,
  updateVotes,
  deleteVotes,
};
