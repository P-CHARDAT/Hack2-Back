const categoryRoutes = require("express").Router();

const {
  getCategories,
  createOneCategory,
} = require("../controllers/category.controllers");

categoryRoutes.get("/", getCategories);
categoryRoutes.post("/", createOneCategory, getCategories);

module.exports = projectRoutes;
