const connection = require('../db-connection');

const findManyProject = () => {
  const sql = "SELECT * FROM project";
  return connection.promise().query(sql);
};

const findOneProjectById = (id) => {
  const sql = "SELECT * FROM project WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const createOneProject = (project) => {
  const sql = "INSERT INTO project SET ?";
  return connection.promise().query(sql, [project]);
};

const updateOneProject = (project, id) => {
  const sql = "UPDATE project SET ? WHERE id=?";
  return connection.promise().query(sql, [project, id]);
};

const deleteOneProject = (id) => {
  const sql = "DELETE FROM project WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const findFavoriteByCreatorId = (id) => {
  const sql =
    "SELECT p.creator_id FROM project p JOIN favorite f ON p.id = f.creator_id WHERE p.id = ?";
  return connection.promise().query(sql, [id]);
};

const findVoteByProjectId = (id) => {
  const sql =
    "SELECT p.description, p.asset_link, p.url_link, p.creator_id, p.category_id FROM project p JOIN votes v ON p.id = v.project_id WHERE v.id = ?";
  return connection.promise().query(sql, [id]);
};

const findAllProjectInfos = () => {
  const sql =
    "SELECT p.id, p.description, p.asset_link, p.url_link, u.pseudo, c.type FROM project p LEFT JOIN votes v ON p.id = v.project_id JOIN category c ON c.id = p.category_id JOIN user u ON u.id = p.creator_id";
  return connection.promise().query(sql);
};

const findOneProjectInfosById = (id) => {
  const sql =
    "SELECT p.description, p.asset_link, p.url_link, u.email, c.type FROM project p LEFT JOIN votes v ON p.id = v.project_id JOIN category c ON c.id = p.category_id JOIN user u ON u.id = p.creator_id WHERE p.id=?";
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findManyProject,
  findOneProjectById,
  createOneProject,
  updateOneProject,
  deleteOneProject,
  findVoteByProjectId,
  findFavoriteByCreatorId,
  findAllProjectInfos,
  findOneProjectInfosById,
};
