const Joi = require("joi");
const {
  findManyProject,
  findOneProjectById,
  createOneProject,
  updateOneProject,
  deleteOneProject,
  findVoteByProjectId,
  findFavoriteByCreatorId,
} = require("../models/project.model");

const getProjects = (req, res) => {
  const id = req.imagesId ? req.imagesId : req.params.id;
  if (id) {
    const status = req.imagesId ? 201 : 200;
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

const createOneProject = (req, res, next) => {
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
    res.status(500).send("Invalide donné");
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

const updateOneProject = (req, res, next) => {
  const { src, alt, dimension } = req.body;
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
    res.status(500).send("Invalide donné");
  } else {
    updateOneProject(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send("Cette image n'existe pas.");
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

module.exports = {
  getProjects,
  createOneProject,
  updateOneProject,
};
