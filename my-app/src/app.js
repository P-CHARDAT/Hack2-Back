require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mainRouter = require('./routes/index');

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ foo: 'hello' });
});

module.exports = app;
