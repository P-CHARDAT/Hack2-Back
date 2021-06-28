const favoritesRoutes = require("express").Router();

const {
  getFavorites,
  createFavorites,
  updateFavorites,
} = require("../controllers/favorites.controllers");

favoritesRoutes.get("/", getFavorites);
favoritesRoutes.get("/:id", getFavorites);
favoritesRoutes.post("/", createFavorites, getFavorites);
favoritesRoutes.put("/:id", updateFavorites, getFavorites);

module.exports = favoritesRoutes;
