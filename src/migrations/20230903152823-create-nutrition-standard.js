'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('NutritionStandards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            ageMin: {
                type: Sequelize.SMALLINT,
            },
            ageMax: {
                type: Sequelize.SMALLINT,
            },
            protein: {
                type: Sequelize.DOUBLE,
            },
            fat: {
                type: Sequelize.DOUBLE,
            },
            carbohydrate: {
                type: Sequelize.DOUBLE,
            }
        })
    },
    async down(queryInterface) {
        await queryInterface.dropTable('NutritionStandards')
    },
}
