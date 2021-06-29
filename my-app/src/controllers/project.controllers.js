const Joi = require("joi");
const {
  findManyProject,
  findOneProjectById,
  createOneProject,
  updateOneProject,
  deleteOneProject,
  findVoteByProjectId,
  findFavoriteByCreatorId,
  findAllProjectInfos,
  findOneProjectInfosById,
} = require("../models/project.model");

const getProjectInfos = (req, res) => {
  findAllProjectInfos()
    .then((results) => {
      const projectsInfos = results[0];
      return res.json(projectsInfos);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
};

const getProjectInfosById = (req, res) => {
  const id = req.projectId ? req.projectId : req.params.id;
  if (id) {
    const status = req.projectId ? 201 : 200;
    return findOneProjectInfosById(id)
      .then((results) => {
        const projects = results[0];
        res.status(status).json(projects[0]);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

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
  const { description, asset_link, url_link, creator_id, category_id } = req.body;
  let validationData = null;
  validationData = Joi.object({
    description: Joi.string(),
    asset_link: Joi.string(),
    url_link: Joi.string(),
    creator_id: Joi.number().integer(),
    category_id: Joi.number().integer(),
  }).validate(
    { description, asset_link, url_link, creator_id, category_id },
    { abortEarly: false }
  ).error;
  if (validationData) {
    console.log(validationData);
    res.status(500).send("Data invalid");
  } else {
    createOneProject({ description, asset_link, url_link, creator_id, category_id })
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
  const { description, asset_link, url_link, creator_id, category_id } = req.body;
  let validationData = null;
  validationData = Joi.object({
    description: Joi.string(),
    asset_link: Joi.string(),
    url_link: Joi.string(),
    creator_id: Joi.number().integer(),
    category_id: Joi.number().integer(),
  }).validate(
    { description, asset_link, url_link, creator_id, category_id },
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

module.exports = {
  getProjects,
  createProject,
  updateProject,
  getProjectInfos,
  getProjectInfosById,
};
