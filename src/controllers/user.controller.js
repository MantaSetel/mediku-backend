const createApiResponse = require('../utils/createApiResponse')

const User = require('../models').User

const createUserHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const userExist = await User.findOne({ where: { email } })

        if (userExist) {
            return res.status(409).send(
                createApiResponse(false, null, {
                    email: 'Email already exist!',
                })
            )
        }

        const user = await User.create({ name, email, password })

        return res.status(201).send(createApiResponse(true, user, null))
    } catch (error) {
        return res
            .status(500)
            .send(createApiResponse(false, null, error.message))
    }
}

const getUserProfileHandler = async (req, res) => {
    try {
        const user = res.locals.user
        return res.status(200).send(createApiResponse(true, user, null))
    } catch (error) {
        return res
            .status(500)
            .send(createApiResponse(false, null, error.message))
    }
}

const UserController = {
    createUserHandler,
    getUserProfileHandler,
}

module.exports = UserController
