import './WeatherCard.css';

function WeatherCard({ todayWeather }) {

  const icon = todayWeather.weather[0].icon;
  const weatherDescription = todayWeather.weather[0].description;
  const updateTime = new Date(todayWeather.dt * 1000).toLocaleTimeString();

  return (
    <div className="weather-card">
      <div className="weather-section temperature-section">
        <p className="title">Temperature</p>
        <p className="number">{(todayWeather.main.temp - 273.15).toFixed(1)} °C</p>
        <p className="title">Min/Max</p>
        <p className="number">{(todayWeather.main.temp_min - 273.15).toFixed(1)}° / {(todayWeather.main.temp_max - 273.15).toFixed(1)}°</p>
      </div>

      <div className="weather-section center-section">
        <h2>{todayWeather.name}</h2>
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={todayWeather.weather[0].main}
            className="weather-icon"
          />
        )}
        <p>{weatherDescription}</p>
        <p>{new Date(todayWeather.dt * 1000).toLocaleDateString('en-GB', {
            weekday: 'short', 
            month: 'short',   
            day: 'numeric' 
          })}</p>
        <p className="update-time">Update time: {updateTime}</p>
      </div>
      
      <div className="weather-section humidity-section">
        <p className="title">Humidity</p>
        <p className="number">{todayWeather.main.humidity}%</p>
      </div>
    </div>
  );
}

export default WeatherCard;
