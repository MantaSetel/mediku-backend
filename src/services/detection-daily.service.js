const { Op } = require('sequelize')
const { DetectionDaily, Nutrition } = require('../models')

const createDetectionDaily = async (detectionDaily) => {
    return DetectionDaily.create(detectionDaily)
}

const updateDetectionDaily = async (id, userId, updateData) => {
    return DetectionDaily.update(
        { ...updateData },
        {
            where: {
                id,
                userId,
            },
        }
    )
}

const getDailyDetectionsByMalnutritionResultId = async (
    malnutritionResultId,
    userId
) => {
    return DetectionDaily.findAll({
        where: {
            malnutritionResultId,
            userId,
        },
    })
}

const getTodayDetection = (malnutritionResultId, userId) => {
    const today = new Date()
    const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
    )
    const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
    )

    return DetectionDaily.findAll({
        include: {
            model: Nutrition,
            attributes: ['id', 'protein', 'carbohydrate', 'fat'],
        },
        attributes: ['id', 'nutritionId', 'isSaved', 'createdAt', 'updatedAt'],
        where: {
            malnutritionResultId,
            userId,
            isSaved: true,
            createdAt: {
                [Op.between]: [startOfDay, endOfDay],
            },
        },
        order: [['createdAt', 'DESC']],
    })
}

const DetectionDailyService = {
    createDetectionDaily,
    updateDetectionDaily,
    getDailyDetectionsByMalnutritionResultId,
    getTodayDetection,
}

module.exports = DetectionDailyService
