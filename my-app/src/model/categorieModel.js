const connection = require("../db-connection");

const findManyCategory = () => {
  const sql = "SELECT * FROM category";
  return connection.promise().query(sql);
};

const findOneCategoryById = (id) => {
  const sql = "SELECT * FROM category WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const createOneCategory = (category) => {
  const sql = "INSERT INTO category SET ?";
  return connection.promise().query(sql, [category]);
};

const updateOneCategory = (category, id) => {
  const sql = "UPDATE category SET ? WHERE id=?";
  return connection.promise().query(sql, category, [id]);
};

const deleteOnecategory = (id) => {
  const sql = "DELETE FROM category WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const findProjectByCategoryId = (id) => {
  const sql =
    "SELECT c.type, c.theme FROM category c JOIN project p ON c.id = p.category_id WHERE p.id = ?";
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findManyCategory,
  findOneCategoryById,
  createOneCategory,
  updateOneCategory,
  deleteOnecategory,
  findProjectByCategoryId,
};
