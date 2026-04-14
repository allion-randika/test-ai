/**
 * Utility Functions
 * Helper functions for weather data processing and DOM manipulation
 */

const Utils = {
    /**
     * Storage keys for localStorage
     */
    STORAGE_KEYS: {
        UNIT: 'weather_unit',
        LAST_CITY: 'weather_last_city'
    },

    /**
     * Temperature unit mappings
     */
    UNITS: {
        celsius: {
            api: 'metric',
            symbol: '°C',
            name: 'Celsius'
        },
        fahrenheit: {
            api: 'imperial',
            symbol: '°F',
            name: 'Fahrenheit'
        }
    },

    /**
     * Day names for forecast
     */
    DAY_NAMES: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    /**
     * Short day names
     */
    SHORT_DAY_NAMES: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    /**
     * Safely get item from localStorage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Stored value or default
     */
    safeGetStorage(key, defaultValue = null) {
        try {
            return localStorage.getItem(key) || defaultValue;
        } catch (e) {
            console.warn('localStorage not available:', e.message);
            return defaultValue;
        }
    },

    /**
     * Safely set item in localStorage
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @returns {boolean} Success status
     */
    safeSetStorage(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.warn('localStorage not available:', e.message);
            return false;
        }
    },

    /**
     * Get stored unit preference
     * @returns {string} Unit ('celsius' or 'fahrenheit')
     */
    getStoredUnit() {
        return this.safeGetStorage(this.STORAGE_KEYS.UNIT, 'celsius');
    },

    /**
     * Save unit preference to localStorage
     * @param {string} unit - Unit to store
     */
    saveUnit(unit) {
        this.safeSetStorage(this.STORAGE_KEYS.UNIT, unit);
    },

    /**
     * Get last searched city from localStorage
     * @returns {string|null} Last city
     */
    getLastCity() {
        return this.safeGetStorage(this.STORAGE_KEYS.LAST_CITY);
    },

    /**
     * Save last searched city to localStorage
     * @param {string} city - City to store
     */
    saveLastCity(city) {
        this.safeSetStorage(this.STORAGE_KEYS.LAST_CITY, city);
    },

    /**
     * Convert temperature between units
     * @param {number} temp - Temperature value
     * @param {string} fromUnit - Source unit
     * @param {string} toUnit - Target unit
     * @returns {number} Converted temperature
     */
    convertTemperature(temp, fromUnit, toUnit) {
        if (fromUnit === toUnit) return temp;
        
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            return Math.round((temp * 9/5) + 32);
        }
        
        if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            return Math.round((temp - 32) * 5/9);
        }
        
        return temp;
    },

    /**
     * Get API unit from display unit
     * @param {string} unit - Display unit
     * @returns {string} API unit
     */
    getApiUnit(unit) {
        return this.UNITS[unit]?.api || 'metric';
    },

    /**
     * Get temperature symbol for unit
     * @param {string} unit - Display unit
     * @returns {string} Temperature symbol
     */
    getTempSymbol(unit) {
        return this.UNITS[unit]?.symbol || '°C';
    },

    /**
     * Format wind speed based on unit
     * @param {number} speed - Wind speed
     * @param {string} unit - Display unit (determines wind speed unit)
     * @returns {string} Formatted wind speed
     */
    formatWindSpeed(speed, unit) {
        if (unit === 'fahrenheit') {
            return `${Math.round(speed)} mph`;
        }
        return `${Math.round(speed)} km/h`;
    },

    /**
     * Get day name from date string
     * @param {string} dateString - Date string (YYYY-MM-DD)
     * @param {boolean} short - Use short format
     * @returns {string} Day name
     */
    getDayName(dateString, short = false) {
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return short ? this.SHORT_DAY_NAMES[dayIndex] : this.DAY_NAMES[dayIndex];
    },

    /**
     * Get day name from timestamp
     * @param {number} timestamp - Unix timestamp
     * @param {boolean} short - Use short format
     * @returns {string} Day name
     */
    getDayNameFromTimestamp(timestamp, short = false) {
        const date = new Date(timestamp * 1000);
        const dayIndex = date.getDay();
        return short ? this.SHORT_DAY_NAMES[dayIndex] : this.DAY_NAMES[dayIndex];
    },

    /**
     * Format timestamp to time string
     * @param {number} timestamp - Unix timestamp
     * @returns {string} Formatted time
     */
    formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    },

    /**
     * Get relative time string
     * @param {Date} date - Date object
     * @returns {string} Relative time
     */
    getRelativeTime(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    },

    /**
     * Process forecast data to get daily summaries
     * @param {Array} forecastList - List of forecast items
     * @param {string} unit - Display unit
     * @returns {Array} Daily forecast summaries
     */
    processForecast(forecastList, unit) {
        const dailyData = {};
        
        forecastList.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            const hour = parseInt(item.dt_txt.split(' ')[1].split(':')[0]);
            
            // Only consider forecasts around midday (12:00) for better representation
            if (!dailyData[date] || (hour >= 11 && hour <= 13)) {
                dailyData[date] = {
                    date: date,
                    timestamp: item.dt,
                    temp: Math.round(item.main.temp),
                    tempMin: Math.round(item.main.temp_min),
                    tempMax: Math.round(item.main.temp_max),
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon,
                    main: item.weather[0].main
                };
            } else {
                // Update min/max if needed
                dailyData[date].tempMin = Math.min(dailyData[date].tempMin, Math.round(item.main.temp_min));
                dailyData[date].tempMax = Math.max(dailyData[date].tempMax, Math.round(item.main.temp_max));
            }
        });
        
        // Convert to array and take first 5 days
        return Object.values(dailyData).slice(0, 5);
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Capitalize first letter
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Get weather description based on icon code
     * @param {string} iconCode - OpenWeatherMap icon code
     * @returns {string} Weather description
     */
    getWeatherDescription(iconCode) {
        const descriptions = {
            '01d': 'Clear sky',
            '01n': 'Clear night',
            '02d': 'Few clouds',
            '02n': 'Few clouds night',
            '03d': 'Scattered clouds',
            '03n': 'Scattered clouds night',
            '04d': 'Broken clouds',
            '04n': 'Broken clouds night',
            '09d': 'Shower rain',
            '09n': 'Shower rain night',
            '10d': 'Rain',
            '10n': 'Rain night',
            '11d': 'Thunderstorm',
            '11n': 'Thunderstorm night',
            '13d': 'Snow',
            '13n': 'Snow night',
            '50d': 'Mist',
            '50n': 'Mist night'
        };
        return descriptions[iconCode] || 'Unknown';
    },

    /**
     * Show element
     * @param {HTMLElement} element - Element to show
     */
    show(element) {
        if (element) {
            element.classList.remove('hidden');
        }
    },

    /**
     * Hide element
     * @param {HTMLElement} element - Element to hide
     */
    hide(element) {
        if (element) {
            element.classList.add('hidden');
        }
    },

    /**
     * Set element text content safely
     * @param {HTMLElement} element - Element to update
     * @param {string} text - Text content
     */
    setText(element, text) {
        if (element) {
            element.textContent = text;
        }
    },

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHTML(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Set element HTML safely (escapes text content)
     * @param {HTMLElement} element - Element to update
     * @param {string} html - HTML content
     */
    setHTML(element, html) {
        if (element) {
            element.innerHTML = html;
        }
    },

    /**
     * Set element attribute safely
     * @param {HTMLElement} element - Element to update
     * @param {string} attr - Attribute name
     * @param {string} value - Attribute value
     */
    setAttr(element, attr, value) {
        if (element) {
            element.setAttribute(attr, value);
        }
    },

    /**
     * Add click event listener
     * @param {HTMLElement} element - Element
     * @param {Function} handler - Click handler
     */
    onClick(element, handler) {
        if (element) {
            element.addEventListener('click', handler);
        }
    },

    /**
     * Add submit event listener
     * @param {HTMLElement} element - Element
     * @param {Function} handler - Submit handler
     */
    onSubmit(element, handler) {
        if (element) {
            element.addEventListener('submit', handler);
        }
    },

    /**
     * Add input event listener with debounce
     * @param {HTMLElement} element - Element
     * @param {Function} handler - Input handler
     * @param {number} wait - Debounce wait time
     */
    onInputDebounce(element, handler, wait = 300) {
        if (element) {
            element.addEventListener('input', this.debounce(handler, wait));
        }
    }
};

// Freeze Utils object to prevent modifications
Object.freeze(Utils);
Object.freeze(Utils.STORAGE_KEYS);
Object.freeze(Utils.UNITS);
Object.freeze(Utils.DAY_NAMES);
Object.freeze(Utils.SHORT_DAY_NAMES);
