'use strict'

const nutritionStandards = require('../data/nutrition-standart.data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert(
            'NutritionStandards',
            nutritionStandards
        )
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('NutritionStandards', null, {})
    },
}
