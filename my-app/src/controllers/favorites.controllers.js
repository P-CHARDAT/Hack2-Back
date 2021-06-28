const {
  findManyFavorites,
  findOneFavoritesById,
  createOneFavorites,
  updateOneFavorites,
  deleteOneFavorites,
  deleteOneFavorites,
} = require("../models/favorites.model");

const getFavorites = (req, res) => {
  const id = req.favoriteId ? req.favoriteId : req.params.id;
  if (id) {
    const status = req.favoriteId ? 201 : 200;
    return findOneFavoritesById(id)
      .then((results) => {
        const favorite = results[0];
        res.status(status).json(favorite[0]);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
  return findManyFavorites()
    .then((results) => {
      const favorite = results[0];
      res.json(favorite);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createFavorites = (req, res, next) => {
  createOneFavorites(req)
    .then(([results]) => {
      req.favoritesId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateFavorites = (req, res, next) => {
  updateOneFavorites(req.body, req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send(`This favorites doesn't exist`);
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};


const deleteFavorites = (req, res) => {
  deleteOneFavorites(req.params.id)
    .then(([results]) => {
      if (results.affetedRows === 0) {
        return res.status(404).send("Favorites not found");
      }
      return res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getFavorites,
  createFavorites,
  updateFavorites,
  deleteFavorites,
};
