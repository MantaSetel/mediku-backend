const tf = require('@tensorflow/tfjs-node')

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

const FoodNutritionService = {
    loadModel,
    getModel,
    model,
}

module.exports = FoodNutritionService
