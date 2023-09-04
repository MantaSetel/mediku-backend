'use strict'

const nutrition = require('../data/nutrition.data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('Nutrition', nutrition)
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('Nutrition', null, {})
    },
}
