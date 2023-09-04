const tf = require('@tensorflow/tfjs-node')
const { Nutrition } = require('../models')

let model = null

const loadModel = async () => {
    model = await tf.loadGraphModel(
        'file://assets/models/food-nutrition/model.json'
    )
    console.log('model food nutrition loaded')
}

const getModel = () => {
    return model
}

const detectNutrition = async (imageBuffer) => {
    const imageTensor = tf.node.decodeImage(imageBuffer)
    const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224])
    const processedImage = resizedImage.div(tf.scalar(255))
    const batchedInput = processedImage.expandDims(0)

    const rgbImage = batchedInput.slice([0, 0, 0, 0], [1, 224, 224, 3])

    const prediction = await model.predict(rgbImage)
    const predictedClassIndex = prediction.argMax(-1).dataSync()[0]
    const confidence = prediction.max().dataSync()[0]

    return { predictedClassIndex, confidence }
}

const getFoodNutritionByFoodId = (foodId) => {
    return Nutrition.findOne({
        where: {
            foodId,
        },
    })
}

const FoodNutritionService = {
    loadModel,
    getModel,
    model,
    detectNutrition,
    getFoodNutritionByFoodId,
}

module.exports = FoodNutritionService
