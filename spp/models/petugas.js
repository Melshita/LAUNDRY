'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.pembayaran, {
        foreignKey: "id_petugas",
        as: "pembayaran"
      })
    }
  };
  petugas.init({
    id_petugas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nama_petugas: DataTypes.STRING,
    level: DataTypes.ENUM('petugas', 'admin')
  }, {
    sequelize,
    modelName: 'petugas',
    tableName: 'petugas'
  });
  return petugas;
};