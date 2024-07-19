import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryWeather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`);
        setWeather(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching the weather data:", error);
      }
    };
    if (capital) {
      fetchWeather();
    }
  }, [capital, apiKey]);

  if (!weather) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.main.temp} °C</p>
      <p>wind {weather.wind.speed} m/s</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
    </div>
  );
};

export default CountryWeather;
