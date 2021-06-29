const connection = require("../db-connection");

const findManyVotes = () => {
  const sql = "SELECT * FROM votes";
  return connection.promise().query(sql);
};

const findOneVotesById = (id) => {
  const sql = "SELECT * FROM votes WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const createOneVotes = (project) => {
  const sql = "INSERT INTO votes SET ?";
  return connection.promise().query(sql, [project]);
};

const updateOneVotes = (project, id) => {
  const sql = "UPDATE votes SET ? WHERE id=?";
  return connection.promise().query(sql, [project, id]);
};

const deleteOneVotes = (id) => {
  const sql = "DELETE FROM votes WHERE id=?";
  return connection.promise().query(sql, [id]);
};


module.exports = {
  findManyVotes,
  findOneVotesById,
  createOneVotes,
  updateOneVotes,
  deleteOneVotes,
};
