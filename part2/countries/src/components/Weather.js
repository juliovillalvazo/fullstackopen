import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Weather = ({ API_KEY, result }) => {
    const [weather, setWeather] = useState([]);
    const city = result[0].name;
    const weatherHTML = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const weatherHook = () => {
        axios.get(weatherHTML).then((response) => {
            setWeather(response.data);
        });
    };

    useEffect(weatherHook, [weatherHTML]);

    if (weather.name) {
        console.log(weather.weather[0].icon);
        return (
            <div>
                <h2>Weather in {weather.name}</h2>
                <p>temperature {(weather.main.temp - 273.15).toFixed(2)}C</p>
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                ></img>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        );
    }
};

export default Weather;
