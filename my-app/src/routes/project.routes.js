const projectRoutes = require("express").Router();

const {
  getProjects,
  createOneProject,
  updateOneProject,
  getProjectInfos,
  getProjectInfosById,
} = require("../controllers/project.controllers");

projectRoutes.get("/", getProjects);
projectRoutes.get("/:id", getProjects);
projectRoutes.get("/infos/", getProjectInfos);
projectRoutes.get("/infos/:id", getProjectInfosById);
projectRoutes.post("/", createOneProject, getProjects);
projectRoutes.put("/:id", updateOneProject, getProjects);

module.exports = projectRoutes;
