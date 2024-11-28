import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';

function App() {
  // Default showing "Toronto" weather
  const [city, setCity] = useState('Toronto');

  const [todayWeather, setTodayWeather] = useState(null);
  const [forecaset, setForecast] = useState(null);

  // My ac api
  const api = "8a40a44e908742f650dcf7d06193be10"

  // Fetch weather data
  useEffect(() => {
    if (!city.trim()) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
      
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTodayWeather(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });

      // Fetch the forecast data
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const dailyForecast = data.list.filter((_, index) => index % 8 === 0);
          setForecast(dailyForecast);
        })
        .catch((error) => {
          console.error("Error fetching weather data: ", error);
        });
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      // update the data by search bar
      setCity(city);
    }
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {todayWeather ? (
        <>
        {/* Call Weather and Forecast card */}
        <WeatherCard todayWeather={todayWeather} />
        <ForecastCard forecast={forecaset}/>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default App;
