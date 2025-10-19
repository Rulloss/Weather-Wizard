// Utility functions for the weather app

const WeatherHelpers = {
    // Convert temperature between Celsius and Fahrenheit
    convertTemperature(temp, fromUnit, toUnit) {
        if (temp === null || temp === undefined) return null;
        
        if (fromUnit === toUnit) return temp;
        
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            return (temp * 9/5) + 32;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            return (temp - 32) * 5/9;
        }
        
        return temp;
    },

    // Format date to readable string
    formatDate(dateString, options = {}) {
        if (!dateString) return 'Unknown';
        
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            ...options
        };
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString(undefined, defaultOptions);
        } catch (error) {
            return 'Invalid Date';
        }
    },

    // Format time to readable string
    formatTime(timestamp, options = {}) {
        if (!timestamp) return 'Unknown';
        
        const defaultOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            ...options
        };
        
        try {
            const date = new Date(timestamp);
            return date.toLocaleTimeString(undefined, defaultOptions);
        } catch (error) {
            return 'Invalid Time';
        }
    },

    // Get relative time (e.g., "2 hours ago")
    getRelativeTime(timestamp) {
        if (!timestamp) return 'Unknown';
        
        try {
            const now = new Date();
            const date = new Date(timestamp);
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);
            
            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
            if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
            if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
            
            return this.formatDate(timestamp);
        } catch (error) {
            return 'Unknown';
        }
    },

    // Debounce function for search input
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

    // Validate city name
    isValidCityName(cityName) {
        if (!cityName || typeof cityName !== 'string') return false;
        
        const trimmed = cityName.trim();
        if (trimmed.length < 2 || trimmed.length > 100) return false;
        
        // Allow letters, spaces, hyphens, apostrophes, and periods
        const validPattern = /^[a-zA-Z\s\-'.]+$/;
        return validPattern.test(trimmed);
    },

    // Get weather condition category
    getWeatherCategory(condition) {
        if (!condition) return 'unknown';
        
        const normalized = condition.toLowerCase();
        
        if (normalized.includes('sun') || normalized.includes('clear')) return 'sunny';
        if (normalized.includes('cloud')) return 'cloudy';
        if (normalized.includes('rain') || normalized.includes('shower') || normalized.includes('drizzle')) return 'rainy';
        if (normalized.includes('snow') || normalized.includes('blizzard')) return 'snowy';
        if (normalized.includes('thunder') || normalized.includes('storm')) return 'stormy';
        if (normalized.includes('fog') || normalized.includes('mist') || normalized.includes('haze')) return 'foggy';
        if (normalized.includes('wind')) return 'windy';
        
        return 'unknown';
    },

    // Get comfort level based on temperature and humidity
    getComfortLevel(temperature, humidity) {
        if (temperature === null || humidity === null) return 'Unknown';
        
        // Simple comfort index calculation
        if (temperature >= 20 && temperature <= 26 && humidity >= 40 && humidity <= 60) {
            return 'Comfortable';
        } else if (temperature < 10 || temperature > 35) {
            return 'Uncomfortable';
        } else if (humidity < 30 || humidity > 70) {
            return 'Moderately Comfortable';
        } else {
            return 'Comfortable';
        }
    },

    // Get UV index description
    getUVDescription(uvIndex) {
        if (uvIndex === null || uvIndex === undefined) return 'Unknown';
        
        if (uvIndex <= 2) return 'Low';
        if (uvIndex <= 5) return 'Moderate';
        if (uvIndex <= 7) return 'High';
        if (uvIndex <= 10) return 'Very High';
        return 'Extreme';
    },

    // Get wind direction from degrees
    getWindDirection(degrees) {
        if (degrees === null || degrees === undefined) return 'Unknown';
        
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    },

    // Validate and sanitize user input
    sanitizeInput(input) {
        if (!input || typeof input !== 'string') return '';
        
        return input
            .trim()
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
            .replace(/[<>]/g, '') // Remove < and > characters
            .substring(0, 100); // Limit length
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Local storage helpers
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.warn('Failed to save to localStorage:', error);
                return false;
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.warn('Failed to read from localStorage:', error);
                return defaultValue;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.warn('Failed to remove from localStorage:', error);
                return false;
            }
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherHelpers;
}
