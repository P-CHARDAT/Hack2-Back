const projectRoutes = require("express").Router();

const {
  getProjects,
  createProject,
  updateProject,
  getProjectInfos,
  getProjectInfosById,
  deleteProject,
} = require("../controllers/project.controllers");

projectRoutes.get("/", getProjects);
projectRoutes.get("/infos", getProjectInfos);
projectRoutes.get("/:id", getProjects);
projectRoutes.get("/infos/:id", getProjectInfosById);
projectRoutes.post("/", createProject, getProjects);
projectRoutes.put("/:id", updateProject, getProjects);
projectRoutes.delete("/:id", deleteProject);

module.exports = projectRoutes;
