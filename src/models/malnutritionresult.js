'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MalnutritionResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  MalnutritionResult.init({
    name: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    agePerMonth: DataTypes.INTEGER,
    birthWeight: DataTypes.DOUBLE,
    bodyWeight: DataTypes.DOUBLE,
    birthHeight: DataTypes.DOUBLE,
    bodyHeight: DataTypes.DOUBLE,
    isMalnutrition: DataTypes.BOOLEAN,
    isSaved: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'MalnutritionResult',
  });
  return MalnutritionResult;
};