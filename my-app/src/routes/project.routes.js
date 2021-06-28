const projectRoutes = require("express").Router();

const {
  getProjects,
  createProject,
  updateProject,
  getProjectInfos,
  getProjectInfosById,
} = require("../controllers/project.controllers");

projectRoutes.get("/", getProjects);
projectRoutes.get("/:id", getProjects);
projectRoutes.get("/infos/", getProjectInfos);
projectRoutes.get("/infos/:id", getProjectInfosById);
projectRoutes.post("/", createProject, getProjects);
projectRoutes.put("/:id", updateProject, getProjects);

module.exports = projectRoutes;
