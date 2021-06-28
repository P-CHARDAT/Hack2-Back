const mainRouter = require("express").Router();
const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");
const favoritesRoutes = require("./favorites.routes");
const votesRoutes = require("./votes.routes");

mainRouter.use("/user", userRoutes);
mainRouter.use("/project", projectRoutes);
mainRouter.use("/favorites", favoritesRoutes);
mainRouter.use("/votes", votesRoutes);

module.exports = mainRouter;
