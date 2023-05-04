require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handling');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`started ${PORT}`))
  } catch (err) {
    console.log(err);
  }
}

start();
