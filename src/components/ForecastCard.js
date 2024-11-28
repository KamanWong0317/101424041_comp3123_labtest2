import './ForecastCard.css';

function ForecastCard({ forecast }) {
    // loading data
    if (!forecast) {
      return <p>Loading forecast weather...</p>;
    }
  
    return (
      <div className="forecast-card">
        <h3>5-Day Forecast</h3>
        <div className="forecast-container">
          {/* list each day */}
          {forecast.map((day, index) => (
            <div className="forecast-item" key={index}>
              <p>{new Date(day.dt * 1000).toLocaleDateString('en-GB', {
                weekday: 'short', 
                month: 'short',   
                day: 'numeric' 
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="forecast-icon"
              />
              <p>{day.main.temp.toFixed(1)} °C</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ForecastCard;
  