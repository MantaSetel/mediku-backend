const MalnutritionController = require('./controllers/mallnutrition.controller')
const SessionController = require('./controllers/session.controller')
const UserController = require('./controllers/user.controller')
const requireUser = require('./middleware/requireUser')

const validateRequest = require('./middleware/validateRequest')
const MalnutritionSchema = require('./schemas/malnutrition.schema')
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

    app.post('/api/malnutrition', requireUser, validateRequest(MalnutritionSchema.createMalnutritionSchema), MalnutritionController.predictHandler)

    app.put('/api/malnutrition-results/:id', requireUser, MalnutritionController.updateMalnutritionHandler)
}
