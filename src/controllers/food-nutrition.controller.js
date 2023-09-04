const DetectionDailyService = require('../services/detection-daily.service')
const FoodNutritionService = require('../services/food-nutrition.service')
const FoodService = require('../services/food.service')
const MalnutritionResultService = require('../services/malnutrition-result.service')

const createApiResponse = require('../utils/createApiResponse')

const detectFoodNutritionHandler = async (req, res) => {
    try {
        const imageBuffer = req.file.buffer
        const malnutritionResultId = req.body.malnutritionResultId

        const { predictedClassIndex, confidence } =
            await FoodNutritionService.detectNutrition(imageBuffer)

        const food = await FoodService.getFoodByClassIndex(predictedClassIndex)

        const nutrition = await FoodNutritionService.getFoodNutritionByFoodId(
            food.id
        )

        console.log(nutrition)

        const userId = res.locals.user.id

        const detectionDaily = {
            userId,
            nutritionId: nutrition.id,
            isSaved: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        if (!malnutritionResultId) {
            const latestMalnutrition =
                await MalnutritionResultService.getLatestMalnutritionResult(
                    userId
                )
            detectionDaily.malnutritionResultId = latestMalnutrition.id
        } else {
            detectionDaily.malnutritionResultId = malnutritionResultId
        }

        const newDetectionDaily =
            await DetectionDailyService.createDetectionDaily(detectionDaily)

        const responseData = {
            predictedClassIndex,
            confidence,
            newDetectionDaily,
            nutrition,
            food,
        }

        return res.status(201).send(createApiResponse(true, responseData, null))
    } catch (error) {
        return res
            .status(500)
            .send(createApiResponse(false, null, error.message))
    }
}

const updateFoodNutritionHandler = async (req, res) => {
    const id = req.params.id
    const userId = res.locals.user.id
    const updateData = req.body

    try {
        const updatedDetectionDaily =
            await DetectionDailyService.updateDetectionDaily(
                id,
                userId,
                updateData
            )
        return res
            .status(201)
            .send(createApiResponse(true, updatedDetectionDaily, null))
    } catch (error) {
        return res
            .status(500)
            .send(createApiResponse(false, null, error.message))
    }
}

const FoodNutritionController = {
    detectFoodNutritionHandler,
    updateFoodNutritionHandler,
}

module.exports = FoodNutritionController
