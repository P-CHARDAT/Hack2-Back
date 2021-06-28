require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
<<<<<<< HEAD
const mainRouter = require('./routes');
=======
const mainRouter = require('./routes/index');
>>>>>>> 2a133c9039c7912a919f25a07b0550211147997d

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
