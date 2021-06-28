const userRouter = require('express').Router();

const {
  getClients,
  createOneClient,
  updateOneClient,
  deleteOneClient,
  verifyCredentials,
} = require('../controllers/user.controllers');

userRouter.get('/', getClients);
// authenticateToken placé avant le getClients de la ligne suivante dans mes premiers tests
userRouter.get('/:id', getClients);
userRouter.post('/', createOneClient, getClients);
userRouter.put('/:id', updateOneClient, getClients);
userRouter.delete('/:id', deleteOneClient);

module.exports = userRouter;
