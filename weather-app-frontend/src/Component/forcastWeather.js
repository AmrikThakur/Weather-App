import React from 'react'
import './weather.css'
import Button from '@material-ui/core/Button';

const ForCastWeather = () => {
    return (
        <div className='forcast_container'>
                    <Button variant="contained" color="green" style={{marginLeft:'20px'}}>
                    Get ForCastWeather
                </Button>     
        </div>
    )
}

export default ForCastWeather