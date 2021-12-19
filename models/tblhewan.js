'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblhewan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tblhewan.init({
    nama: DataTypes.STRING,
    namaSpesies: DataTypes.STRING,
    umur: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tblhewan',
  });
  return tblhewan;
};