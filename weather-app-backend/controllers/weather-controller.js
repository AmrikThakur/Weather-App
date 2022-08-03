const asyncMiddleware = require('../middleware/async')
const axios = require('axios')

// API for Get Current Weather
exports.currentWeather = asyncMiddleware(async (req, res) => {

    let city_id = req.body.city_id
    if (!city_id) return res.status(400).send({ message: "City id is required" })

    let weatherData = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=538882fc8387290c6cee83f313a6acf5`)

    const current_weather = weatherData.data;

    return res.status(200).send({
        message: "Weather Fetched Successfully",
        values: current_weather
    })
})


// API for Get ForcastWeather

exports.forCastWeather = asyncMiddleware(async (req, res) => {

    let city_id = req.body.city_id
    if (!city_id) return res.status(400).send({ message: "City id is required" })

    let forecastData = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${city_id}&appid=538882fc8387290c6cee83f313a6acf5`);
    const data = forecastData.data;

    return res.status(200).send({
        message: "ForCast Weather Fetched Successfully",
        values: data
    })
})


