const mainRouter = require("express").Router();
const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");

mainRouter.use("/user", userRoutes);
mainRouter.use("/project", projectRoutes);

module.exports = mainRouter;
