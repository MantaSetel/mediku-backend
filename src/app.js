const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const db = require('./models')
const routes = require('./routes')
const deserializeUser = require('./middleware/deserializeUser')
const MalnutritionService = require('./services/malnutrition.service')

const PORT = process.env.PORT || 8080
const HOST = 'localhost'

app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(deserializeUser)

db.sequelize.sync().then(async () => {
    console.log('Database connected')
    await MalnutritionService.loadModel()
    app.listen(PORT, HOST, () => {
        console.log(`Server running at http://${HOST}:${PORT}`)
        routes(app)
    })
})
