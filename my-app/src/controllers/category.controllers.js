const Joi = require("joi");
const {
  findManyCategory,
  findOneCategoryById,
  createOneCategory,
} = require("../models/category.model");

const getCategories = (req, res) => {
  const id = req.categoriesId ? req.categoriesId : req.params.id;
  if (id) {
    const status = req.categoriesId ? 201 : 200;
    return findOneCategoryById(id)
      .then((results) => {
        const projects = results[0];
        res.status(status).json(projects[0]);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
  return findManyCategory()
    .then((results) => {
      const categories = results[0];
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createCategory = (req, res, next) => {
  const { type, theme } = req.body;
  let validationData = null;
  validationData = Joi.object({
    type: Joi.string(),
    theme: Joi.string(),
  }).validate(
    { type, theme },
    { abortEarly: false }
  ).error;
  if (validationData) {
    console.log(validationData);
    res.status(500).send("Invalid data");
  } else {
    createOneCategory({ type, theme })
      .then(([results]) => {
        req.categoryId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};



module.exports = {
  getCategories,
  createCategory,
};
