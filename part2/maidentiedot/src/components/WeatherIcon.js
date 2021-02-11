import React from 'react';

const WeatherIcon = ({ weather }) => {
    return (
        <div>
            <img
                alt='Weather Icon'
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                style={{ width: 50, height: 50 }}
            />
        </div>
    );
};

export default WeatherIcon;