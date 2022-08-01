import React, { useState, useEffect } from 'react'
import './weather.css'
import cloud from '../assets/cloud.jpg'
import sunny from '../assets/sunny.png'
import rainy from '../assets/rainy.png'
import CloudIcon from '@material-ui/icons/Cloud';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import weather from '../assets/rainy.png'
import moment from 'moment'
import gif from '../assets/giphy.gif'
import { GET_CURRENT_WEATHER, GET_FORCAST_WEATHER, cities, weekArray } from './constant'
import Button from '@material-ui/core/Button';
import Select from 'react-select'
import axios from 'axios';

const Weather = () => {
    const [seeForcast, setSeeForcast] = useState(false)
    const [city, setCity] = useState('')
    const [test, setTest] = useState(false)
    const [currentWeather, setCurrentWeather] = useState([])
    const [forcastWeather, setForCastweather] = useState([])
    const imgSrc = [rainy, sunny, cloud]
    const onChangeHandler = (e) => {
        setTest(!test)
        setCity(e.id)
    }
    const getWeather = () => {
        axios.post(GET_CURRENT_WEATHER, {
            city_id: city
        }).then(res => {
            setCurrentWeather(res.data)
        })
    }
    const getForCastWeather = () => {
        setSeeForcast(!seeForcast)
        axios.post(GET_FORCAST_WEATHER, {
            city_id: city
        }).then(res => {
            setForCastweather(res.data)
        })
    }
    const kelvinToCelsius = (kelvin) => {
        return kelvin - 273.15;
    }
    console.log(currentWeather, 'currentWeathercurrentWeathercurrentWeather')
    const { values } = currentWeather
    const { name, main, wind, weather = [], sys } = values
    let weatherType = weather.length && weather.filter((item) => item.main)[0]
    let temp = kelvinToCelsius(main?.temp).toFixed()
    let tempMin = kelvinToCelsius(main?.temp_min).toFixed()
    let tempMax = kelvinToCelsius(main?.temp_max).toFixed()

    return (
        <div className='container'>
            <div className='top-section'>
                <div className='top-right-section'>
                    <span>
                        <CloudIcon className='side_icon' /><span className='side_text'>{isNaN(parseFloat(temp)) == true ? 24 : temp}&deg;C</span>
                    </span>
                    <span className='side_seond_text'>
                        Percipitation:{main?.pressure || 1200}<br />Humidity:{main?.humidity || 89}<br />Wind:{wind?.speed || 23}
                    </span>
                </div>
                <div className='top-right-section'>
                    <h3>{name == 'values' ? "Mohali,Punjab" : `${name + ',' + sys.country}`}</h3>
                    <h5>{moment(new Date()).format("DD/MM/YYYY")}</h5>
                    <h5>{weatherType.main ? weatherType.main : 'Cloudy'}</h5>
                </div>
            </div>
            <div className='city_selector' spacing={10}>
                <Select className='city_options' options={cities} placeholder="Select City ...." onChange={(e) => onChangeHandler(e)} />
            </div>
            <Button className='city_button' variant="contained" color="primary" component="span" onClick={() => getWeather()}>
                Get Weather
            </Button>
            <img className='forcast_weather' src={gif} />
            <Button className='forcast_button' variant="contained" color="primary" onClick={() => getForCastWeather()}>
                {!seeForcast ? 'forcast?' : 'Close'}
            </Button>
            <div className='cards'>
                <Grid container spacing={3}>
                    {weekArray.length && weekArray.map((item) => {
                        return <Grid item xs={1}>
                            <Paper className='little_cards' >
                                {item}
                                <img className='weather_icon' src={imgSrc[Math.floor(Math.random() * imgSrc.length)]} />
                                {!seeForcast ? 'Temp?' : `${isNaN(parseFloat(tempMin)) == true || isNaN(parseFloat(tempMax)) == true ?
                                    '0' + ' ' + '0'
                                    :
                                    tempMax + ' ' + tempMin}`
                                }
                                <br />
                                <span className='humidity_inside'>Humidity:23</span>
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </div>
        </div>
    )
}

export default Weather