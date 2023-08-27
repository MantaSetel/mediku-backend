const tf = require("@tensorflow/tfjs-node");
const customRound = require("../utils/customRound");
const { MalnutritionResult } = require('../models')

let model = null;

const loadModel = async () => {
    model = await tf.loadGraphModel("file://assets/models/malnutrition/model.json");
    console.log('model malnutrition loaded')
};

const getModel = async () => {
    if (!model) {
        console.log('loading model malnutrition.......')
        await loadModel();
    }
    return model;
}

const getPrediction = async ({ gender, agePerMonth, birthWeight, bodyWeight, birthHeight, bodyHeight }) => {
    const inputData = tf.tensor2d([[gender, agePerMonth, birthWeight, bodyWeight, birthHeight, bodyHeight]]);
    const model = await getModel();
    const prediction = model.predict(inputData);
    const resultTensor = prediction.dataSync();
    const resultArray = Array.from(resultTensor);
    const result = resultArray[0];
    return customRound(result);
}

const saveResult = async (result) => {
    return MalnutritionResult.create(result)
}

const updateDataById = async (id, updateData) => {
    return MalnutritionResult.update({ ...updateData }, {
        where: {
            id
        }
    })
}

const MalnutritionService = {
    getPrediction,
    loadModel,
    saveResult,
    updateDataById
}

module.exports = MalnutritionService