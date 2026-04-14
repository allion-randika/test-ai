import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData, searchCities } from '../services/weatherApi';

const DEFAULT_CITY = {
  name: 'New York',
  latitude: 40.7128,
  longitude: -74.006,
  country: 'United States',
};

export function useWeather(city) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetCity = city || DEFAULT_CITY;

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(targetCity.latitude, targetCity.longitude);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }, [targetCity.latitude, targetCity.longitude]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weather, loading, error, refetch: fetchWeather };
}

export function useCitySearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await searchCities(query);
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, search };
}
