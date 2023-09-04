'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class DetectionDaily extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            DetectionDaily.belongsTo(models.User, { foreignKey: 'id' })
            DetectionDaily.belongsTo(models.Nutrition, {
                foreignKey: 'nutritionId',
            })
            DetectionDaily.belongsTo(models.MalnutritionResult, {
                foreignKey: 'malnutritionResultId',
            })
        }
    }
    DetectionDaily.init(
        {
            userId: DataTypes.INTEGER,
            nutritionId: DataTypes.INTEGER,
            isSaved: DataTypes.BOOLEAN,
            malnutritionResultId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'DetectionDaily',
        }
    )
    return DetectionDaily
}
