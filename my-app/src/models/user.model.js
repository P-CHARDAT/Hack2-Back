const connection = require("../db-connection");
const argon2 = require("argon2");

const findManyUser = () => {
  const sql = 'SELECT * FROM user';
  return connection.promise().query(sql);
};

const findOneUserById = (id) => {
  const sql = 'SELECT * FROM user WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOneUser = (user) => {
  const sql = 'INSERT INTO user SET ?';
  return connection.promise().query(sql, [user]);
};

const existEmailUser = (email) => {
  const sql = 'SELECT * FROM user WHERE email = ?';
  return connection.promise().query(sql, [email]);
};

const updateOneUser = (user, id) => {
  const sql = 'UPDATE user SET ? WHERE id=?';
  return connection.promise().query(sql, [user, id]);
};

const deleteOneUser = (id) => {
  const sql = 'DELETE FROM user WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const hashPassword = async (password) => {
  return await argon2.hash(password);
};

const verifyPassword = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};

const findFavoriteByUserId = (id) => {
  const sql =
    "SELECT u.pseudo, u.mail, u.mdp FROM user u JOIN favorite f ON u.id = f.user_id WHERE f.id = ?";
  return connection.promise().query(sql, [id]);
};

const findVoteByUserId = (id) => {
  const sql =
    "SELECT u.pseudo, u.mail, u.mdp FROM user u JOIN votes v ON u.id = v.user_id WHERE v.id = ?";
  return connection.promise().query(sql, [id]);
};

// Hash password

module.exports = {
  findOneUserById,
  createOneUser,
  existEmailUser,
  updateOneUser,
  deleteOneUser,
  hashPassword,
  verifyPassword,
  findFavoriteByUserId,
  findManyUser,
  findVoteByUserId,
};
