const categoryRoutes = require("express").Router();

const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/category.controllers");

categoryRoutes.get("/", getCategories);
categoryRoutes.post("/", createCategory, getCategories);
categoryRoutes.delete("/:id", deleteCategory);

module.exports = categoryRoutes;
