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

const createOneProjectById = (req, res, next) => {
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

const createAssestProject = (req, res, next) => {
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
    console.log(validationData);
    res.status(500).send("Invalide donné");
  } else {
    upload(req, res, (err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(req.file.filename);
        req.body.asset_link = req.file.filename;
        req.body.description = JSON.parse(req.body.configuration).description;
        req.body.url_link = JSON.parse(req.body.configuration).url_link;
        next();
      }
    });
  }
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

module.exports = {
  getProjects,
  createOneProjectById,
  updateAssestProject,
  createAssestProject,
};
