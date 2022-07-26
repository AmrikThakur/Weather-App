import axios from "axios"
const appid = process.env.REACT_APP_API_URL

export const GET_CURRENT_WEATHER = 'http://localhost:3006/api/weather/currentWeather'
export const GET_FORCAST_WEATHER = 'http://localhost:3006/api/weather/forCastWeather'

export const cities = [
    { "id": 6167865, label: "Toronto", country: "CA", value: 'Toronto', },
    { "id": 6094817, label: "Ottawa", country: "CA", value: "Ottawa" },
    { "id": 1850147, label: "Tokyo", country: "JP", value: "Tokyo" }
]

export const weekArray = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

export const getCurrentCityAPI = async (lat, lon) => {
    let data = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${appid}`)
    return data
}