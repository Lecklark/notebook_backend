const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
});

const Contact = sequelize.define('contact', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  fullName: {type: DataTypes.STRING},
  address: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
});

User.hasMany(Contact);
Contact.belongsTo(User);

module.exports = { User, Contact };
