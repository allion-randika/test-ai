/**
 * Weather API Service
 * Handles all OpenWeatherMap API interactions
 */

const API = {
    // Configuration - Users should replace this with their own API key
    // Get a free API key at: https://openweathermap.org/api
    API_KEY: 'demo_key',
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    ICON_URL: 'https://openweathermap.org/img/wn',

    /**
     * Fetch current weather data for a city
     * @param {string} city - City name
     * @param {string} units - Temperature units ('metric', 'imperial', or 'standard')
     * @returns {Promise<Object>} Weather data
     */
    async getCurrentWeather(city, units = 'metric') {
        const url = `${this.BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${this.API_KEY}`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to fetch weather data');
            }
            
            return await response.json();
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Network error. Please check your internet connection.');
            }
            throw error;
        }
    },

    /**
     * Fetch 5-day weather forecast for a city
     * @param {string} city - City name
     * @param {string} units - Temperature units ('metric', 'imperial', or 'standard')
     * @returns {Promise<Object>} Forecast data
     */
    async getForecast(city, units = 'metric') {
        const url = `${this.BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${this.API_KEY}`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to fetch forecast data');
            }
            
            return await response.json();
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Network error. Please check your internet connection.');
            }
            throw error;
        }
    },

    /**
     * Fetch weather data by geographic coordinates
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {string} units - Temperature units
     * @returns {Promise<Object>} Weather data
     */
    async getWeatherByCoords(lat, lon, units = 'metric') {
        const url = `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${this.API_KEY}`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to fetch weather data');
            }
            
            return await response.json();
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Network error. Please check your internet connection.');
            }
            throw error;
        }
    },

    /**
     * Fetch forecast by geographic coordinates
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {string} units - Temperature units
     * @returns {Promise<Object>} Forecast data
     */
    async getForecastByCoords(lat, lon, units = 'metric') {
        const url = `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${this.API_KEY}`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to fetch forecast data');
            }
            
            return await response.json();
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Network error. Please check your internet connection.');
            }
            throw error;
        }
    },

    /**
     * Get weather icon URL
     * @param {string} iconCode - OpenWeatherMap icon code
     * @param {string} size - Icon size ('2x' for high DPI)
     * @returns {string} Icon URL
     */
    getIconUrl(iconCode, size = '4x') {
        return `${this.ICON_URL}/${iconCode}@${size}.png`;
    }
};

// Freeze API object to prevent modifications
Object.freeze(API);
