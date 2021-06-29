const { json } = require("express");
const Joi = require("joi");
const multer = require("multer");
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
      res.json(projectsInfos);
    })
    .catch((err) => {
      res.status(500).send(err.message);
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

const createAssestProject = (req, res, next) => {
  const { description, asset_link, url_link, creator_id, category_id } =
    req.body;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/asset_link");
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage }).single("file");
  // let validationData = null;
  // validationData = Joi.object({
  //   description: Joi.string(),
  //   asset_link: Joi.string(),
  //   url_link: Joi.string(),
  //   creator_id: Joi.number(),
  //   category_id: Joi.number(),
  // }).validate(
  //   { description, asset_link, url_link },
  //   { abortEarly: false }
  // ).error;
  // if (validationData) {
  //   console.log(validationData);
  //   res.status(500).send("Invalide donné");
  // } else {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log(req.file.filename);
      console.log(req.body.configuration);
      const configuration = JSON.parse(req.body.configuration);
      console.log(configuration);
      req.project = {
        asset_link: req.file.filename,
        ...configuration,
      };
      console.log(req.project);
      createOneProject(req.project).then((result) => {
        req.projectId = result[0].insertId;
        next();
      });
    }
  });
  // }
};

const updateAssestProject = (req, res) => {
  const { description, asset_link, url_link } = req.body;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/asset_link");
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage }).single("file");
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
    upload(req, res, (err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(req.file.filename);
        updateOneProject(
          {
            description: req.body.description,
            asset_link: req.file.filename,
            url_link: req.body.url_link,
          },
          req.params.id
        ).then(([result]) => {
          if (result.affectedRows === 0) {
            res.send("updtate fail");
          } else {
            res.status(204).end();
          }
        });
      }
    });
  }
};

const deleteProject = (req, res) => {
  deleteOneProject(req.params.id)
    .then(([results]) => {
      if (results.affetedRows === 0) {
        return res.status(404).send("Project not found");
      }
      return res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getProjects,
  updateAssestProject,
  createAssestProject,
  deleteProject,
  getProjectInfos,
  getProjectInfosById,
};
