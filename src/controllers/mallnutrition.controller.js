const MalnutritionService = require("../services/malnutrition.service");
const createApiResponse = require("../utils/createApiResponse");

const predictHandler = async (req, res) => {
    try {
        const { gender, agePerMonth, birthWeight, bodyWeight, birthHeight, bodyHeight } = req.body;
        const parsedGender = gender ? 1 : 0;
        const parsedBirthWeight = parseFloat(birthWeight);
        const parsedBodyWeight = parseFloat(bodyWeight);
        const parsedBirthHeight = parseFloat(birthHeight);
        const parsedBodyHeight = parseFloat(bodyHeight);

        const inputData = {
            gender: parsedGender,
            agePerMonth,
            birthWeight: parsedBirthWeight,
            bodyWeight: parsedBodyWeight,
            birthHeight: parsedBirthHeight,
            bodyHeight: parsedBodyHeight
        }

        const result = await MalnutritionService.getPrediction(inputData);

        return res.send(createApiResponse(true, { isMalnutrition: result }, null));
    } catch (error) {
        return res.status(500).send(createApiResponse(false, null, error.message));
    }
}

const MalnutritionController = {
    predictHandler
}

module.exports = MalnutritionController;