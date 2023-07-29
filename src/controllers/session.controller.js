const UserService = require('../services/user.service')
const SessionService = require('../services/session.service')
const createApiResponse = require('../utils/createApiResponse')
const { signJwt } = require('../utils/jwt.utils')
const { accessTokenTtl, refreshTokenTtl } = require('../config/auth')

const createSessionHandler = async (req, res) => {
    // validate email
    const user = await UserService.findUser({ email: req.body.email })

    if (!user) {
        return res.status(401).send(
            createApiResponse(false, null, {
                email: 'Email is not registered!',
            })
        )
    }

    // validate password
    const isPasswordValid = await user.comparePassword(req.body.password)

    if (!isPasswordValid) {
        return res.status(401).send(
            createApiResponse(false, null, {
                password: 'Password is not correct!',
            })
        )
    }

    // create session
    const session = await SessionService.createSession(
        user.id,
        req.get('user-agent') || ''
    )

    const { dataValues: dataValuesUser } = user

    // create access token, kenapa kok dataValues bukan user? karena kalo didistruction maka akan ada tampil semua method sequelizenya
    const accessToken = signJwt(
        { ...dataValuesUser, session: session.id },
        { expiresIn: accessTokenTtl }
    )

    // create refresh token
    const refreshToken = signJwt(
        { ...dataValuesUser, session: session.id },
        { expiresIn: refreshTokenTtl }
    )

    // return access token and refresh token
    return res
        .status(201)
        .send(
            createApiResponse(
                true,
                { accessToken, refreshToken, role: user.role },
                null
            )
        )
}

const deleteSessionHandler = async (req, res) => {
    const sessionId = res.locals.user.session

    await SessionService.updateSession({ id: sessionId }, { valid: false })

    return res.sendStatus(204)
}

const SessionController = {
    createSessionHandler,
    deleteSessionHandler,
}

module.exports = SessionController
