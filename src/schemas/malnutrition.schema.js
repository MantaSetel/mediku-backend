const { object, number, bool } = require('yup')

const createMalnutritionSchema = object({
    body: object({
        gender: bool().required('Gender is required'),
        agePerMonth: number().required('Age per month is required'),
        birthWeight: number().required('Birth weight is required'),
        bodyWeight: number().required('Body weight is required'),
        birthHeight: number().required('Birth height is required'),
        bodyHeight: number().required('Body height is required'),
    }),
})

const MalnutritionSchema = {
    createMalnutritionSchema,
}

module.exports = MalnutritionSchema
