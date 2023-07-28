const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

app.get('/', (req, res) => {
    return res.send(config);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})