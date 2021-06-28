const projectRoutes = require("express").Router();

const {
  getProjects,
  createOneProject,
  updateOneProject,
} = require("../controllers/project.controllers");

projectRoutes.get("/", getProjects);
projectRoutes.get("/:id", getProjects);
projectRoutes.post("/", createOneProject, getProjects);
projectRoutes.put("/:id", updateOneProject, getProjects);

module.exports = projectRoutes;
