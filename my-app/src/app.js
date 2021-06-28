require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
<<<<<<< HEAD
const mainRouter = require('./routes/index');
=======
const cookieParser = require('cookie-parser');
>>>>>>> 6eda3ee45be855246e70bec12cc602a6021c30b1

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
