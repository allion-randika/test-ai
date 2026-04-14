import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getWeatherInfo, formatHour, formatTemperature } from '../utils/weatherUtils';
import './HourlyForecast.css';

export default function HourlyForecast({ weather, unit }) {
  if (!weather?.hourly) {
    return (
      <div className="hourly-forecast fade-in">
        <h3 className="hourly-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Hourly Forecast
        </h3>
        <p className="hourly-loading">Loading hourly forecast...</p>
      </div>
    );
  }

  const { hourly } = weather;
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Get first 24 hours of data (API returns hourly data from current time)
  const hours = useMemo(() => {
    const times = hourly?.time?.slice(0, 24) || [];
    const temps = hourly?.temperature_2m || [];
    const codes = hourly?.weather_code || [];
    const precips = hourly?.precipitation_probability || [];
    
    return times.map((time, i) => ({
      time,
      temp: temps[i] ?? 0,
      weatherCode: codes[i] ?? 0,
      precip: precips[i] ?? 0,
    }));
  }, [hourly]);

  const validHours = hours.filter(h => h.time && h.temp != null);
  
  // Ensure selectedIndex is valid
  const safeSelectedIndex = Math.min(selectedIndex, validHours.length - 1);
  const selectedHour = validHours[safeSelectedIndex];

  return (
    <div className="hourly-forecast fade-in">
      <h3 className="hourly-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        Hourly Forecast
      </h3>
      
      <div className="hourly-chart">
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={validHours} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tickFormatter={(time) => formatHour(time)}
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              interval={3}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(temp) => `${Math.round(temp)}°`}
            />
            <Tooltip 
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="chart-tooltip">
                      <span className="tooltip-time">{formatHour(data.time)}</span>
                      <span className="tooltip-temp">{formatTemperature(data.temp, unit)}</span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#2563eb" 
              fill="url(#tempGradient)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="hourly-scroll">
        {validHours.map((hour, index) => {
          const weatherInfo = getWeatherInfo(hour.weatherCode);
          return (
            <button
              key={hour.time}
              className={`hourly-card ${safeSelectedIndex === index ? 'selected' : ''}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`${formatHour(hour.time)}: ${weatherInfo.description}, ${formatTemperature(hour.temp, unit)}`}
            >
              <span className="hour-time">{formatHour(hour.time)}</span>
              <span className="hour-icon" aria-hidden="true">{weatherInfo.icon}</span>
              <span className="hour-temp">{formatTemperature(hour.temp, unit)}</span>
              {hour.precip > 0 && (
                <span className="hour-precip">{hour.precip}%</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
