const FoodNutritionService = require('../services/food-nutrition.service')

const tf = require('@tensorflow/tfjs-node')

const detectFoodNutritionHandler = async (req, res) => {
    try {
        const model = FoodNutritionService.getModel()

        const imageBuffer = req.file.buffer
        const imageTensor = tf.node.decodeImage(imageBuffer)
        const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224])
        const processedImage = resizedImage.div(tf.scalar(255))
        const batchedInput = processedImage.expandDims(0)

        const rgbImage = batchedInput.slice([0, 0, 0, 0], [1, 224, 224, 3])

        const prediction = await model.predict(rgbImage)
        const predictedClassIndex = prediction.argMax(-1).dataSync()[0]
        const confidence = prediction.max().dataSync()[0]

        return res.send({
            predictedClassIndex,
            confidence,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}

const FoodNutritionController = {
    detectFoodNutritionHandler,
}

module.exports = FoodNutritionController
