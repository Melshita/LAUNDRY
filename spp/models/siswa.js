'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.pembayaran, {
        foreignKey: "nisn",
        as: "pembayaran"
      })
      this.belongsTo(models.kelas, {
        foreignKey: "id_kelas",
        as: "kelas"
      })
    }
  };
  siswa.init({
    nisn: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nis: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    id_kelas: DataTypes.INTEGER,
    alamat: DataTypes.STRING,
    no_tlp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'siswa',
    tableName: 'siswa'
  });
  return siswa;
};