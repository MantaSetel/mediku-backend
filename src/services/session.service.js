const { get } = require('lodash')
const { Session, User } = require('../models')
const { verifyJwt, signJwt } = require('../utils/jwt.utils')
const { accessTokenTtl } = require('../config/auth')

const createSession = (userId, userAgent) => {
    return Session.create({
        userId,
        valid: true,
        userAgent,
    })
}

const reIssueAccessToken = async ({ refreshToken }) => {
    const { decoded } = verifyJwt(refreshToken)

    if (!decoded || !get(decoded, 'session')) return false

    const session = await Session.findByPk(get(decoded, 'session'))

    if (!session || !session.valid) return false

    const user = await User.findByPk(session.userId) // session is model that has userId

    if (!user) return false

    const { dataValues: dataValuesUser } = user

    const accessToken = signJwt(
        { ...dataValuesUser, session: session.id },
        { expiresIn: accessTokenTtl }
    )

    return accessToken
}

const updateSession = async (query, update) => {
    return Session.update(update, { where: query, returning: true })
}

const SessionService = {
    createSession,
    reIssueAccessToken,
    updateSession,
}

module.exports = SessionService
