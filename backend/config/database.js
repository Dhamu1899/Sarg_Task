const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Crud', 'root', 'Dhamu123', {
  host: 'llocalhost',
  dialect: 'mysql',
});

module.exports = sequelize;
