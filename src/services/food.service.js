const { Food } = require('../models')

const getFoodByClassIndex = async (classIndex) => {
    return Food.findOne({
        where: {
            classIndex,
        },
    })
}

const FoodService = {
    getFoodByClassIndex,
}

module.exports = FoodService
