'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Food extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Food.hasOne(models.Nutrition, { foreignKey: 'foodId' })
        }
    }
    Food.init(
        {
            name: DataTypes.STRING,
            classIndex: DataTypes.NUMBER,
        },
        {
            sequelize,
            modelName: 'Food',
            tableName: 'Foods',
        }
    )
    return Food
}
