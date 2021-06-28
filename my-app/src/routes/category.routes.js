const categoryRoutes = require("express").Router();

const {
  getCategories,
  createCategory,
} = require("../controllers/category.controllers");

categoryRoutes.get("/", getCategories);
categoryRoutes.post("/", createCategory, getCategories);

module.exports = categoryRoutes;
