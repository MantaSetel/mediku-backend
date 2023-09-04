const { Op } = require('sequelize')
const { NutritionStandard } = require('../models')

const getNutritionStandardByAge = async (age) => {
    return NutritionStandard.findOne({
        where: {
            ageMin: {
                [Op.lte]: age,
            },
            ageMax: {
                [Op.gte]: age,
            },
        },
    })
}

const NutritionStandardService = {
    getNutritionStandardByAge,
}

module.exports = NutritionStandardService
