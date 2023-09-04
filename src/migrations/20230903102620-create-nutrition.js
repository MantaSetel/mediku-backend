'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Nutrition', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            foodId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Foods',
                    key: 'id',
                },
            },
            calcium: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            protein: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            carbohydrate: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            fat: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            calorie: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        })
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Nutrition')
    },
}
