/**
 * Weather Dashboard - Main Application
 * Handles UI interactions and weather data display
 */

const App = {
    // DOM Elements
    elements: {},
    
    // Abort controller for cancelling requests
    abortController: null,

    // State
    state: {
        currentUnit: 'celsius',
        currentWeather: null,
        forecast: null,
        lastUpdateTime: null,
        isLoading: false,
        currentCity: null
    },

    /**
     * Initialize the application
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadSavedState();
        
        // Load last searched city or default
        const lastCity = Utils.getLastCity();
        if (lastCity) {
            this.elements.cityInput.value = lastCity;
            this.fetchWeather(lastCity);
        } else {
            // Show default city
            this.fetchWeather('New York');
        }
    },

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.elements = {
            // Search
            searchForm: document.getElementById('searchForm'),
            cityInput: document.getElementById('cityInput'),
            clearBtn: document.getElementById('clearBtn'),
            locationBtn: document.getElementById('locationBtn'),
            
            // Unit toggle
            celsiusBtn: document.getElementById('celsiusBtn'),
            fahrenheitBtn: document.getElementById('fahrenheitBtn'),
            
            // States
            loadingState: document.getElementById('loadingState'),
            errorState: document.getElementById('errorState'),
            errorMessage: document.getElementById('errorMessage'),
            retryBtn: document.getElementById('retryBtn'),
            weatherContent: document.getElementById('weatherContent'),
            
            // Current weather
            cityName: document.getElementById('cityName'),
            countryName: document.getElementById('countryName'),
            weatherDescription: document.getElementById('weatherDescription'),
            weatherIcon: document.getElementById('weatherIcon'),
            temperature: document.getElementById('temperature'),
            temperatureUnit: document.getElementById('temperatureUnit'),
            feelsLike: document.getElementById('feelsLike'),
            humidity: document.getElementById('humidity'),
            windSpeed: document.getElementById('windSpeed'),
            lastUpdated: document.getElementById('lastUpdated'),
            
            // Forecast
            forecastGrid: document.getElementById('forecastGrid')
        };
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Search form
        Utils.onSubmit(this.elements.searchForm, (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Clear button
        Utils.onClick(this.elements.clearBtn, () => {
            this.elements.cityInput.value = '';
            this.elements.clearBtn.classList.remove('visible');
            this.elements.cityInput.focus();
        });

        // Input clear button visibility
        this.elements.cityInput.addEventListener('input', () => {
            if (this.elements.cityInput.value.length > 0) {
                this.elements.clearBtn.classList.add('visible');
            } else {
                this.elements.clearBtn.classList.remove('visible');
            }
        });

        // Location button
        Utils.onClick(this.elements.locationBtn, () => {
            this.getUserLocation();
        });

        // Unit toggle
        Utils.onClick(this.elements.celsiusBtn, () => {
            this.setUnit('celsius');
        });

        Utils.onClick(this.elements.fahrenheitBtn, () => {
            this.setUnit('fahrenheit');
        });

        // Retry button
        Utils.onClick(this.elements.retryBtn, () => {
            const city = this.elements.cityInput.value.trim() || 'New York';
            this.fetchWeather(city);
        });
    },

    /**
     * Load saved state from localStorage
     */
    loadSavedState() {
        const savedUnit = Utils.getStoredUnit();
        this.setUnit(savedUnit);
    },

    /**
     * Handle search submission
     */
    handleSearch() {
        const city = this.elements.cityInput.value.trim();
        
        if (city.length < 2) {
            this.showError('Please enter at least 2 characters');
            return;
        }
        
        this.fetchWeather(city);
    },

    /**
     * Fetch weather data for a city
     * @param {string} city - City name
     */
    async fetchWeather(city) {
        // Cancel any pending requests
        if (this.abortController) {
            this.abortController.abort();
        }
        
        // Create new abort controller for this request
        this.abortController = new AbortController();
        const signal = this.abortController.signal;
        
        if (this.state.isLoading) return;
        
        this.state.isLoading = true;
        this.state.currentCity = city;
        this.showLoading();
        this.elements.cityInput.value = city;
        
        try {
            const apiUnit = Utils.getApiUnit(this.state.currentUnit);
            
            // Fetch current weather and forecast in parallel
            const [weatherData, forecastData] = await Promise.all([
                API.getCurrentWeather(city, apiUnit),
                API.getForecast(city, apiUnit)
            ]);
            
            // Check if request was aborted
            if (signal.aborted) return;
            
            this.state.currentWeather = weatherData;
            this.state.forecast = forecastData;
            this.state.lastUpdateTime = new Date();
            
            Utils.saveLastCity(city);
            
            this.renderWeather();
            this.renderForecast();
            this.showWeather();
            
        } catch (error) {
            // Ignore abort errors
            if (error.name === 'AbortError') return;
            
            console.error('Weather fetch error:', error);
            this.showError(this.getErrorMessage(error));
        } finally {
            if (!signal.aborted) {
                this.state.isLoading = false;
            }
        }
    },

    /**
     * Get user-friendly error message
     * @param {Error} error - Error object
     * @returns {string} Error message
     */
    getErrorMessage(error) {
        const message = error.message.toLowerCase();
        
        if (message.includes('not found') || message.includes('404')) {
            return 'City not found. Please check the spelling and try again.';
        }
        if (message.includes('network') || message.includes('failed to fetch')) {
            return 'Network error. Please check your internet connection.';
        }
        if (message.includes('401') || message.includes('unauthorized')) {
            return 'Invalid API key. Please check your OpenWeatherMap API key.';
        }
        if (message.includes('429')) {
            return 'API rate limit exceeded. Please try again later.';
        }
        
        return error.message || 'An unexpected error occurred.';
    },

    /**
     * Get user location using Geolocation API
     */
    getUserLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser.');
            return;
        }
        
        this.showLoading();
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.fetchWeatherByCoords(
                    position.coords.latitude,
                    position.coords.longitude
                );
            },
            (error) => {
                this.state.isLoading = false;
                let message = 'Unable to get your location.';
                
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Location permission denied. Please enable location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        message = 'Location request timed out.';
                        break;
                }
                
                this.showError(message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes cache
            }
        );
    },

    /**
     * Fetch weather by coordinates
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     */
    async fetchWeatherByCoords(lat, lon) {
        try {
            const apiUnit = Utils.getApiUnit(this.state.currentUnit);
            
            const [weatherData, forecastData] = await Promise.all([
                API.getWeatherByCoords(lat, lon, apiUnit),
                API.getForecastByCoords(lat, lon, apiUnit)
            ]);
            
            this.state.currentWeather = weatherData;
            this.state.forecast = forecastData;
            this.state.lastUpdateTime = new Date();
            
            this.elements.cityInput.value = weatherData.name;
            
            this.renderWeather();
            this.renderForecast();
            this.showWeather();
            
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.showError(this.getErrorMessage(error));
        } finally {
            this.state.isLoading = false;
        }
    },

    /**
     * Set temperature unit
     * @param {string} unit - 'celsius' or 'fahrenheit'
     */
    setUnit(unit) {
        if (this.state.currentUnit === unit) return;
        
        this.state.currentUnit = unit;
        
        // Update UI buttons
        this.elements.celsiusBtn.classList.toggle('active', unit === 'celsius');
        this.elements.fahrenheitBtn.classList.toggle('active', unit === 'fahrenheit');
        
        // Save preference
        Utils.saveUnit(unit);
        
        // Re-fetch weather with new unit if we have a current city
        if (this.state.currentCity) {
            this.fetchWeather(this.state.currentCity);
        }
    },

    /**
     * Render current weather data
     */
    renderWeather() {
        const data = this.state.currentWeather;
        
        if (!data) return;
        
        // City and country
        Utils.setText(this.elements.cityName, data.name);
        Utils.setText(this.elements.countryName, data.sys.country);
        
        // Weather description
        Utils.setText(this.elements.weatherDescription, data.weather[0].description);
        
        // Weather icon
        Utils.setAttr(this.elements.weatherIcon, 'src', API.getIconUrl(data.weather[0].icon, '4x'));
        Utils.setAttr(this.elements.weatherIcon, 'alt', data.weather[0].description);
        
        // Temperature
        Utils.setText(this.elements.temperature, Math.round(data.main.temp));
        Utils.setText(this.elements.temperatureUnit, Utils.getTempSymbol(this.state.currentUnit));
        
        // Details
        const apiUnit = Utils.getApiUnit(this.state.currentUnit);
        Utils.setText(this.elements.feelsLike, `${Math.round(data.main.feels_like)}${Utils.getTempSymbol(this.state.currentUnit)}`);
        Utils.setText(this.elements.humidity, `${data.main.humidity}%`);
        Utils.setText(this.elements.windSpeed, Utils.formatWindSpeed(data.wind.speed, this.state.currentUnit));
        
        // Last updated
        this.updateLastUpdated();
    },

    /**
     * Update the last updated timestamp
     */
    updateLastUpdated() {
        if (this.state.lastUpdateTime) {
            Utils.setText(this.elements.lastUpdated, Utils.getRelativeTime(this.state.lastUpdateTime));
        }
    },

    /**
     * Render 5-day forecast
     */
    renderForecast() {
        const data = this.state.forecast;
        
        if (!data || !data.list) {
            Utils.setHTML(this.elements.forecastGrid, '');
            return;
        }
        
        const dailyForecast = Utils.processForecast(data.list, this.state.currentUnit);
        
        Utils.setHTML(this.elements.forecastGrid, '');
        
        dailyForecast.forEach((day, index) => {
            const card = document.createElement('div');
            card.className = 'forecast-card';
            
            // Determine if today
            const isToday = index === 0;
            const dayName = isToday ? 'Today' : Utils.getDayName(day.date, true);
            
            card.innerHTML = `
                <span class="forecast-day">${dayName}</span>
                <img class="forecast-icon" src="${API.getIconUrl(day.icon, '2x')}" alt="${day.description}">
                <div class="forecast-temp">
                    ${day.tempMax}°
                </div>
                <div class="forecast-temp-low">
                    ${day.tempMin}°
                </div>
                <span class="forecast-desc">${day.description}</span>
            `;
            
            this.elements.forecastGrid.appendChild(card);
        });
    },

    /**
     * Show loading state
     */
    showLoading() {
        Utils.hide(this.elements.errorState);
        Utils.hide(this.elements.weatherContent);
        Utils.show(this.elements.loadingState);
    },

    /**
     * Show error state
     * @param {string} message - Error message
     */
    showError(message) {
        Utils.hide(this.elements.loadingState);
        Utils.hide(this.elements.weatherContent);
        Utils.show(this.elements.errorState);
        Utils.setText(this.elements.errorMessage, message);
    },

    /**
     * Show weather content
     */
    showWeather() {
        Utils.hide(this.elements.loadingState);
        Utils.hide(this.elements.errorState);
        Utils.show(this.elements.weatherContent);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    
    // Update last updated time every minute
    setInterval(() => {
        if (App.state.lastUpdateTime && !App.state.isLoading) {
            App.updateLastUpdated();
        }
    }, 60000);
});
