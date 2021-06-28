const votesRoutes = require("express").Router();

const {
  getVotes,
  createVotes,
  updateVotes,
} = require("../controllers/votes.controllers");

votesRoutes.get("/", getVotes);
votesRoutes.get("/:id", getVotes);
votesRoutes.post("/", createVotes, getVotes);
votesRoutes.put("/:id", updateVotes, getVotes);

module.exports = votesRoutes;
