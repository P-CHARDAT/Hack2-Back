const Joi = require("joi");
const {
  findManyFavorites,
  findOneFavoritesById,
  createOneFavorites,
  updateOneFavorites,
  deleteOneFavorites,
  findAllFavoritesInfos,
} = require("../models/favorites.model");

// Renommer les controllers liés à favorites + Faire les exports

const getProjects = (req, res) => {
  const id = req.projectId ? req.projectId : req.params.id;
  if (id) {
    const status = req.projectId ? 201 : 200;
    return findOneProjectById(id)
      .then((results) => {
        const projects = results[0];
        res.status(status).json(projects[0]);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
  return findManyProject()
    .then((results) => {
      const projects = results[0];
      res.json(projects);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createProject = (req, res, next) => {
  const { description, asset_link, url_link } = req.body;
  let validationData = null;
  validationData = Joi.object({
    description: Joi.string(),
    asset_link: Joi.string(),
    url_link: Joi.string(),
  }).validate(
    { description, asset_link, url_link },
    { abortEarly: false }
  ).error;
  if (validationData) {
    console.log(validationData);
    res.status(500).send("Data invalid");
  } else {
    createOneProject({ description, asset_link, url_link })
      .then(([results]) => {
        req.projectId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateProject = (req, res, next) => {
  const { description, asset_link, url_link } = req.body;
  let validationData = null;
  validationData = Joi.object({
    description: Joi.string(),
    asset_link: Joi.string(),
    url_link: Joi.string(),
  }).validate(
    { description, asset_link, url_link },
    { abortEarly: false }
  ).error;
  if (validationData) {
    res.status(500).send("Data invalid");
  } else {
    updateOneProject(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send(`This project doesn't exist`);
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};
