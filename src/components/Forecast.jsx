import { getWeatherInfo, formatDay, formatTemperature } from '../utils/weatherUtils';
import './Forecast.css';

export default function Forecast({ weather, unit }) {
  if (!weather?.daily) {
    return (
      <div className="forecast fade-in">
        <h3 className="forecast-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          5-Day Forecast
        </h3>
        <p className="forecast-loading">Loading forecast...</p>
      </div>
    );
  }

  const { daily } = weather;
  const forecastDays = daily.time?.slice(0, 5) || [];

  return (
    <div className="forecast fade-in">
      <h3 className="forecast-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        5-Day Forecast
      </h3>
      <div className="forecast-grid">
        {forecastDays.map((date, index) => {
          const weatherInfo = getWeatherInfo(daily.weather_code?.[index] || 0);
          const maxTemp = daily.temperature_2m_max?.[index] ?? 0;
          const minTemp = daily.temperature_2m_min?.[index] ?? 0;
          
          return (
            <div key={date} className="forecast-card">
              <span className="forecast-day">{formatDay(date)}</span>
              <span className="forecast-icon">{weatherInfo.icon}</span>
              <div className="forecast-temps">
                <span className="temp-high">{formatTemperature(maxTemp, unit)}</span>
                <span className="temp-low">{formatTemperature(minTemp, unit)}</span>
              </div>
              <span className="forecast-desc">{weatherInfo.description}</span>
              {daily.precipitation_sum?.[index] > 0 && (
                <span className="precipitation">
                  💧 {daily.precipitation_sum[index].toFixed(1)}mm
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
