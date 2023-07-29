const UserController = require('./controllers/user.controller');

const validateRequest = require('./middleware/validateRequest');

const UserSchema = require('./schemas/user.schema');

module.exports = (app) => {
    app.post('/api/users', validateRequest(UserSchema.createUserSchema), UserController.createUserHandler);
}