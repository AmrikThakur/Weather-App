const cors = require('cors')
const express = require('express')
const weather = require('../routes/weather-route')

module.exports = function (app) {
    app.use(cors())
    app.use(express.json())
    app.use('/api/weather', weather)
}