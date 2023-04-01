const { Sequelize } = require('sequelize');


module.exports = new Sequelize(process.env.DB_HOST, {
  dialect: 'postgres',
  port: process.env.DB_PORT,
});
