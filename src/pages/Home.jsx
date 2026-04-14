import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import HourlyForecast from '../components/HourlyForecast';
import { useWeather } from '../hooks/useWeather';
import './Home.css';

const DEFAULT_CITY = {
  name: 'New York',
  latitude: 40.7128,
  longitude: -74.006,
  country: 'United States',
};

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [unit, setUnit] = useState('C');
  const { weather, loading, error } = useWeather(selectedCity);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const currentCity = selectedCity || DEFAULT_CITY;

  return (
    <div className="home">
      <header className="header">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <h1>Weather Dashboard</h1>
        </div>
        <div className="unit-toggle">
          <button 
            className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
            onClick={() => setUnit('C')}
          >
            °C
          </button>
          <button 
            className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
            onClick={() => setUnit('F')}
          >
            °F
          </button>
        </div>
      </header>

      <section className="search-section">
        <SearchBar onCitySelect={handleCitySelect} currentCity={selectedCity} />
      </section>

      <main className="main-content">
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="error-message">{error}</p>
          </div>
        )}

        {weather && !loading && !error && (
          <div className="weather-content">
            <CurrentWeather weather={weather} city={currentCity} unit={unit} />
            <HourlyForecast weather={weather} unit={unit} />
            <Forecast weather={weather} unit={unit} />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Data provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a></p>
      </footer>
    </div>
  );
}
