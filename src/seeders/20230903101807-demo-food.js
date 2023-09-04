'use strict'

const foods = require('../data/foods.data')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('Foods', foods)
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('Foods', null, {})
    },
}
