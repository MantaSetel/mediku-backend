const MalnutritionService = require("../services/malnutrition.service");
const createApiResponse = require("../utils/createApiResponse");

const parseData = ({ gender, agePerMonth, birthWeight, bodyWeight, birthHeight, bodyHeight }) => {
    const parsedGender = gender ? 1 : 0;
    const parsedBirthWeight = parseFloat(birthWeight);
    const parsedBodyWeight = parseFloat(bodyWeight);
    const parsedBirthHeight = parseFloat(birthHeight);
    const parsedBodyHeight = parseFloat(bodyHeight);

    const result = {
        gender: parsedGender,
        agePerMonth,
        birthWeight: parsedBirthWeight,
        bodyWeight: parsedBodyWeight,
        birthHeight: parsedBirthHeight,
        bodyHeight: parsedBodyHeight
    }

    return result
}

const predictHandler = async (req, res) => {
    try {
        const parsedData = parseData(req.body);

        const isMalnutrition = await MalnutritionService.getPrediction(parsedData);

        const user = res.locals.user

        const malnutritionResult = await MalnutritionService.saveResult({ ...parsedData, userId: user.id, isMalnutrition, isSaved: false })

        return res.send(createApiResponse(true, malnutritionResult, null));
    } catch (error) {
        return res.status(500).send(createApiResponse(false, null, error.message));
    }
}

const updateMalnutritionHandler = async (req, res) => {
    try {
        const updateData = req.body
        const malnutritionResultId = req.params.id

        MalnutritionService.updateDataById(malnutritionResultId, updateData)

        return res.status(201).send(createApiResponse(true, null, null))
    } catch(error) {
        return res.status(500).send(createApiResponse(false, null, error.message))
    }
}

const MalnutritionController = {
    predictHandler,
    updateMalnutritionHandler
}

module.exports = MalnutritionController;