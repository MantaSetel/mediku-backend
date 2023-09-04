const multer = require('multer')
const FoodNutritionController = require('./controllers/food-nutrition.controller')
const MalnutritionController = require('./controllers/mallnutrition.controller')
const SessionController = require('./controllers/session.controller')
const UserController = require('./controllers/user.controller')
const requireUser = require('./middleware/requireUser')

const validateRequest = require('./middleware/validateRequest')
const MalnutritionSchema = require('./schemas/malnutrition.schema')
const SessionSchema = require('./schemas/session.schema')

const UserSchema = require('./schemas/user.schema')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

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

    app.post(
        '/api/malnutrition',
        requireUser,
        validateRequest(MalnutritionSchema.createMalnutritionSchema),
        MalnutritionController.predictHandler
    )

    app.put(
        '/api/malnutrition-results/:id',
        requireUser,
        MalnutritionController.updateMalnutritionHandler
    )

    app.post(
        '/api/food-nutrition/detect',
        requireUser,
        upload.single('image'),
        FoodNutritionController.detectFoodNutritionHandler
    )

    app.put(
        '/api/food-nutrition/results/:id',
        requireUser,
        FoodNutritionController.updateFoodNutritionHandler
    )

    app.get(
        '/api/malnutrition-results',
        requireUser,
        MalnutritionController.getResultsHandler
    )

    app.get(
        '/api/malnutrition-results/:id/daily-detects',
        requireUser,
        MalnutritionController.getDailyDetectionsHandler
    )
}
