import "./weather.css";
import Swal from 'sweetalert2';

import searchIcon from "../Assets/search.png";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import humidity from "../Assets/humidity.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";
import { useEffect, useRef, useState } from "react";
const API_KEY = import.meta.env.VITE_API_ID;

const WeatherApp = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow
  };

  const searchWeather = async (city) => {
    if (!city) {
      Swal.fire("City cannot be blank!");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        Swal.fire("City not found");
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    searchWeather("Trivandrum");
  }, []);

  return (
    <>
      <div className="weather">
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder="Search" />
          <img
            src={searchIcon}
            alt="search icon"
            onClick={() => searchWeather(inputRef.current.value)}
          />
        </div>
        {weatherData && (
          <>
            <img
              src={weatherData.icon}
              alt="weather-icon"
              className="weather-icon"
            />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity} alt="humidity" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind} alt="windspeed" />
                <div>
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
