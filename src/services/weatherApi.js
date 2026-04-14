const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeatherData(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,is_day',
    hourly: 'temperature_2m,weather_code,precipitation_probability',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum',
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`${BASE_URL}?${params}`, {
    signal: AbortSignal.timeout(10000),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  try {
    return await response.json();
  } catch {
    throw new Error('Failed to parse weather data');
  }
}

export async function searchCities(query) {
  if (!query || query.length < 2) return [];
  
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  );
  
  if (!response.ok) {
    throw new Error('Failed to search cities');
  }
  
  const data = await response.json();
  return data.results || [];
}
