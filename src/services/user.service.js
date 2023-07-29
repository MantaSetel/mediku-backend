const User = require('../models').User

const findUser = async (query) => {
    return User.findOne({ where: query })
}

const updateById = async (id, data) => {
    await User.update(data, { where: { id }, returning: true })
    const updatedUser = await User.findOne({ where: { id } })
    return updatedUser
}

const getAllUsers = async () => {
    return User.findAll()
}

const UserService = {
    findUser,
    updateById,
    getAllUsers,
}

module.exports = UserService
