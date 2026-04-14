import { Droplets, Wind, Sun, Moon } from 'lucide-react';
import { getWeatherInfo, formatTemperature } from '../utils/weatherUtils';
import './CurrentWeather.css';

export default function CurrentWeather({ weather, city, unit }) {
  if (!weather?.current) {
    return (
      <div className="current-weather fade-in">
        <p>Loading current weather...</p>
      </div>
    );
  }

  const current = weather.current;
  const weatherInfo = getWeatherInfo(current.weather_code || 0);
  const isDay = current.is_day === 1;

  return (
    <div className="current-weather fade-in">
      <div className="weather-main">
        <div className="weather-info">
          <h2 className="city-name">{city?.name || 'Unknown'}</h2>
          <p className="country-name">{city?.country || ''}</p>
          <p className="weather-description">{weatherInfo.description}</p>
        </div>
        <div className="weather-display">
          <span className="weather-icon-large">{weatherInfo.icon}</span>
          <div className="temperature-container">
            <span className="temperature">{formatTemperature(current.temperature_2m, unit)}</span>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-card">
          {isDay ? <Sun size={24} /> : <Moon size={24} />}
          <div className="detail-info">
            <span className="detail-label">{isDay ? 'Day' : 'Night'}</span>
            <span className="detail-value">{isDay ? 'Daytime' : 'Nighttime'}</span>
          </div>
        </div>
        <div className="detail-card">
          <Droplets size={24} />
          <div className="detail-info">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{current.relative_humidity_2m ?? 0}%</span>
          </div>
        </div>
        <div className="detail-card">
          <Wind size={24} />
          <div className="detail-info">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{Math.round(current.wind_speed_10m || 0)} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
