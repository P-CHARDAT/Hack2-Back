const mainRouter = require('express').Router();
const userRoutes = require('./user.routes');


mainRouter.use('/user', userRoutes);


module.exports = mainRouter;