'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
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
    Session.init(
        {
            userId: DataTypes.UUID,
            valid: DataTypes.BOOLEAN,
            userAgent: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Session',
        }
    )

    Session.associate = (models) => {
        Session.belongsTo(models.User, { foreignKey: 'id' })
    }

    return Session
}
