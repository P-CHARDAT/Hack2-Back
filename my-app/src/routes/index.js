const mainRouter = require("express").Router();
const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");
const categoryRoutes = require("./category.routes")

mainRouter.use("/user", userRoutes);
mainRouter.use("/project", projectRoutes);
mainRouter.use("/category", categoryRoutes);

module.exports = mainRouter;
