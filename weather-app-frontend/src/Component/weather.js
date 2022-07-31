import React, { useState, useEffect } from 'react'
import './weather.css'
import CloudIcon from '@material-ui/icons/Cloud';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import weather from '../assets/rainy.png'
import sunny from '../assets/sunny.png'
import moment from 'moment'
import gif from '../assets/giphy.gif'
import { GET_CURRENT_WEATHER, GET_FORCAST_WEATHER, cities, weekArray } from './constant'
import Button from '@material-ui/core/Button';
import Select from 'react-select'
import axios from 'axios';

const Weather = () => {
    const [seeForcast, setSeeForcast] = useState(false)
    const [city, setCity] = useState('')
    const [currentWeather, setCurrentWeather] = useState([])
    const [forcastWeather, setForCastweather] = useState([])

    const onChangeHandler = (e) => {
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
    console.log(currentWeather, 'currentWeathercurrentWeathercurrentWeather')
    console.log(forcastWeather, 'currentWeathercurrentWeathercurrentWeather')

    return (
        <div className='container'>
            <div className='top-section'>
                <div className='top-right-section'>
                    <span>
                        <CloudIcon className='side_icon' /><span className='side_text'>24&deg;C
                            <span className='side_seond_text'>
                                Percipitation:59%
                            </span>
                        </span>
                    </span>
                </div>
                <div className='top-right-section'>
                    <h3>Mohali, Punjab</h3>
                    <h5>{moment(new Date()).format("DD/MM/YYYY")}</h5>
                    <h5>Cloudy</h5>
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
                                <img className='weather_icon' src={sunny} />
                                {!seeForcast ? 'Temp?' : ''}
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </div>
        </div>
    )
}

export default Weather