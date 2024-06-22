const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Spreadsheet extends Model {}

Spreadsheet.init({
  row: DataTypes.INTEGER,
  column: DataTypes.INTEGER,
  value: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Spreadsheet',
});

module.exports = Spreadsheet;
