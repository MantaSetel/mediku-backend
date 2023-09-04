const MalnutritionResultService = require('../services/malnutrition-result.service')
const MalnutritionService = require('../services/malnutrition.service')
const createApiResponse = require('../utils/createApiResponse')
const { DetectionDaily } = require('../models')
const NutritionStandardService = require('../services/nutrition-standard.service')
const DetectionDailyService = require('../services/detection-daily.service')

const parseData = ({
    gender,
    agePerMonth,
    birthWeight,
    bodyWeight,
    birthHeight,
    bodyHeight,
}) => {
    const parsedGender = gender ? 1 : 0
    const parsedBirthWeight = parseFloat(birthWeight)
    const parsedBodyWeight = parseFloat(bodyWeight)
    const parsedBirthHeight = parseFloat(birthHeight)
    const parsedBodyHeight = parseFloat(bodyHeight)

    const result = {
        gender: parsedGender,
        agePerMonth,
        birthWeight: parsedBirthWeight,
        bodyWeight: parsedBodyWeight,
        birthHeight: parsedBirthHeight,
        bodyHeight: parsedBodyHeight,
    }

    return result
}

const predictHandler = async (req, res) => {
    try {
        const parsedData = parseData(req.body)

        const isMalnutrition = await MalnutritionService.getPrediction(
            parsedData
        )

        const user = res.locals.user

        const malnutritionResult = await MalnutritionService.saveResult({
            ...parsedData,
            userId: user.id,
            isMalnutrition,
            isSaved: false,
        })

        return res.send(createApiResponse(true, malnutritionResult, null))
    } catch (error) {
        return res
            .status(500)
            .send(createApiResponse(false, null, error.message))
    }
}

const updateMalnutritionHandler = async (req, res) => {
    try {
        const updateData = req.body
        const malnutritionResultId = req.params.id

        MalnutritionService.updateDataById(malnutritionResultId, updateData)

        return res.status(201).send(createApiResponse(true, null, null))
    } catch (error) {
        return res
            .status(500)
            .send(createApiResponse(false, null, error.message))
    }
}

const getResultsHandler = async (req, res) => {
    try {
        const user = res.locals.user
        const histories =
            await MalnutritionResultService.getSavedResultsByUserId(user.id)
        const updatedHistories = histories.map((history) => {
            const { id, isMalnutrition, createdAt } = history
            const date = new Date(createdAt)
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const day = date.getDate()

            const fullDate = `${day}/${month}/${year}`
            return {
                id,
                isMalnutrition,
                date: fullDate,
            }
        })
        return res.send(createApiResponse(true, updatedHistories, null))
    } catch (error) {
        return res
            .status(500)
            .send(createApiResponse(false, null, error.message))
    }
}

const calculateNutrition = (detection) => {
    return detection.reduce(
        (acc, curr) => {
            const { protein, carbohydrate, fat } = curr.Nutrition
            acc.proteinTotal += protein
            acc.carbohydrateTotal += carbohydrate
            acc.fatTotal += fat
            return acc
        },
        {
            proteinTotal: 0,
            carbohydrateTotal: 0,
            fatTotal: 0,
        }
    )
}

const getDailyDetectionsHandler = async (req, res) => {
    try {
        const malnutritionResultId = req.params.id

        const malnutritionResult =
            await MalnutritionResultService.getResultById(
                malnutritionResultId,
                {
                    attributes: ['id', 'agePerMonth', 'isMalnutrition'],
                }
            )

        const nutritionStandard =
            await NutritionStandardService.getNutritionStandardByAge(
                malnutritionResult.agePerMonth
            )

        // udah dapet standard tinggal kalkulasi
        const todayDetection = await DetectionDailyService.getTodayDetection(
            malnutritionResultId,
            res.locals.user.id
        )

        console.log(todayDetection[0].Nutrition)

        const { proteinTotal, carbohydrateTotal, fatTotal } =
            calculateNutrition(todayDetection)

        const nutrition = [
            {
                name: 'Protein',
                total: proteinTotal,
                standard: nutritionStandard.protein,
            },
            {
                name: 'Karbohidrat',
                total: carbohydrateTotal,
                standard: nutritionStandard.carbohydrate,
            },
            {
                name: 'Lemak',
                total: fatTotal,
                standard: nutritionStandard.fat,
            },
        ]

        return res
            .status(200)
            .send(
                createApiResponse(true, { malnutritionResult, nutrition }, null)
            )
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .send(createApiResponse(false, null, error.message))
    }
}

const MalnutritionController = {
    predictHandler,
    updateMalnutritionHandler,
    getResultsHandler,
    getDailyDetectionsHandler,
}

module.exports = MalnutritionController
