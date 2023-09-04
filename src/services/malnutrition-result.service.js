const { MalnutritionResult } = require('../models')

const getResults = () => {
    return MalnutritionResult.findAll()
}

const getSavedResultsByUserId = (userId) => {
    return MalnutritionResult.findAll({
        where: {
            userId,
            isSaved: true,
        },
        order: [['createdAt', 'DESC']],
    })
}

const getLatestMalnutritionResult = async (userId) => {
    return MalnutritionResult.findOne({
        where: {
            userId,
        },
        order: [['createdAt', 'DESC']],
    })
}

const getResultById = (id, query) => {
    return MalnutritionResult.findOne({
        where: {
            id,
        },
        ...query,
    })
}

const MalnutritionResultService = {
    getResults,
    getSavedResultsByUserId,
    getLatestMalnutritionResult,
    getResultById,
}

module.exports = MalnutritionResultService
