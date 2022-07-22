const express = require('express');
const router = express.Router();
const weatherController=require('../controllers/weather-controller')

router.post("/currentWeather", weatherController.currentWeather)

router.post("/forCastWeather", weatherController.forCastWeather)

module.exports = router;