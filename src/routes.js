const SessionController = require('./controllers/session.controller')
const UserController = require('./controllers/user.controller')
const requireUser = require('./middleware/requireUser')

const validateRequest = require('./middleware/validateRequest')
const SessionSchema = require('./schemas/session.schema')

const UserSchema = require('./schemas/user.schema')

module.exports = (app) => {
    app.post(
        '/api/users',
        validateRequest(UserSchema.createUserSchema),
        UserController.createUserHandler
    )

    app.post(
        '/api/sessions',
        validateRequest(SessionSchema.createSessionSchema),
        SessionController.createSessionHandler
    )

    app.delete(
        '/api/sessions',
        requireUser,
        SessionController.deleteSessionHandler
    )

    app.get('/api/user', requireUser, UserController.getUserProfileHandler)
}
