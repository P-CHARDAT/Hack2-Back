const projectRoutes = require("express").Router();

const {
  getProjects,
  updateAssestProject,
  createAssestProject,
} = require("../controllers/project.controllers");

projectRoutes.get("/", getProjects);
projectRoutes.get("/:id", getProjects);
projectRoutes.post("/", createAssestProject, getProjects);
projectRoutes.put("/:id", updateAssestProject , getProjects);

module.exports = projectRoutes;
