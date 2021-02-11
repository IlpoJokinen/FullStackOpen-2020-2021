import React, { useState, useEffect } from 'react';

import axios from 'axios';

import WeatherIcon from '../components/WeatherIcon';

const WeatherInfo = ({ capital }) => {
    const [weather, setWeather] = useState();
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data);
            });
    }, [capital, api_key])


    if (weather) {
        const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
        const temp = weather.main.temp - 273.15;
        return (
            <div>
                <h4>{`Weather in ${capital}`}</h4>
                <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', width: 300 }}>
                    <div style={{ flex: 1 }}>
                        <strong>temperature:</strong>
                    </div>
                    <div style={{ flex: 2 }}>
                        <p>{`${temp.toFixed(1)} Celcius`}</p>
                    </div>
                </div>
                <WeatherIcon weather={weather} />
                <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', width: 300 }}>
                    <div style={{ flex: 1 }}>
                        <strong>wind:</strong>
                    </div>
                    <div style={{ flex: 3 }}>
                        <p>{`${weather.wind.speed} mph direction ${compassSector[(weather.wind.deg / 22.5).toFixed(0)]}`}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return <p>No weather information found</p>
    }

};

export default WeatherInfo;
