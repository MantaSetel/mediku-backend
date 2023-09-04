'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class NutritionStandard extends Model {}
    NutritionStandard.init(
        {
            ageMin: DataTypes.INTEGER,
            ageMax: DataTypes.INTEGER,
            protein: DataTypes.DOUBLE,
            fat: DataTypes.DOUBLE,
            carbohydrate: DataTypes.DOUBLE,
        },
        {
            sequelize,
            modelName: 'NutritionStandard',
            timestamps: false,
        }
    )
    return NutritionStandard
}
