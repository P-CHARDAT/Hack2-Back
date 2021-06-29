const projectRoutes = require("express").Router();

const {
  getProjects,
  updateAssestProject,
  createAssestProject,
  deleteProject,
  getProjectInfos,
  getProjectInfosById
} = require("../controllers/project.controllers");

projectRoutes.get("/", getProjects);
projectRoutes.get("/infos/", getProjectInfos);
projectRoutes.get("/infos/:id", getProjectInfosById);
projectRoutes.get("/:id", getProjects);
projectRoutes.post("/", createAssestProject, getProjects);

projectRoutes.put("/:id", updateAssestProject, getProjects);
projectRoutes.delete("/:id", deleteProject);


module.exports = projectRoutes;
