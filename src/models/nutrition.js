'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Nutrition extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Nutrition.belongsTo(models.Food, { foreignKey: 'id' })
            Nutrition.hasMany(models.DetectionDaily, {
                foreignKey: 'nutritionId',
            })
        }
    }
    Nutrition.init(
        {
            foodId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Foods',
                    key: 'id',
                },
            },
            calcium: DataTypes.DOUBLE,
            protein: DataTypes.DOUBLE,
            carbohydrate: DataTypes.DOUBLE,
            fat: DataTypes.DOUBLE,
            calorie: DataTypes.DOUBLE,
        },
        {
            sequelize,
            modelName: 'Nutrition',
            tableName: 'Nutrition',
        }
    )

    return Nutrition
}
