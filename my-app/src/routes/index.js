const mainRouter = require("express").Router();
const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");
const favoritesRoutes = require("./favorites.routes");
const votesRoutes = require("./votes.routes");
const categoryRoutes = require("./category.routes");

mainRouter.use("/user", userRoutes);
mainRouter.use("/project", projectRoutes);
mainRouter.use("/favorites", favoritesRoutes);
mainRouter.use("/votes", votesRoutes);
mainRouter.use("/category", categoryRoutes);

module.exports = mainRouter;
