const WeatherService = {
    // Base configuration - these will be overridden by user-provided API configuration
    config: {
        apiKey: '',
        baseUrl: '',
        endpoints: {
            current: '',
            forecast: '',
            search: ''
        }
    },

    // Initialize service with user configuration
    init(config) {
        this.config = { ...this.config, ...config };
    },

    // Get current weather by city name
    async getCurrentWeather(city) {
        if (!this.config.baseUrl || !this.config.apiKey) {
            throw new Error('Weather API configuration not provided. Please configure API endpoints and key.');
        }

        try {
            const url = this._buildUrl('current', { q: city });
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
                } else if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your weather API configuration.');
                } else if (response.status === 429) {
                    throw new Error('API rate limit exceeded. Please try again later.');
                } else {
                    throw new Error(`Failed to fetch weather data (${response.status}). Please try again.`);
                }
            }

            const data = await response.json();
            return this._normalizeCurrentWeather(data);
        } catch (error) {
            if (error.message.includes('fetch')) {
                throw new Error('Network error. Please check your internet connection and try again.');
            }
            throw error;
        }
    },

    // Get current weather by coordinates
    async getCurrentWeatherByCoords(lat, lon) {
        if (!this.config.baseUrl || !this.config.apiKey) {
            throw new Error('Weather API configuration not provided. Please configure API endpoints and key.');
        }

        try {
            const url = this._buildUrl('current', { lat, lon });
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data for your location (${response.status}).`);
            }

            const data = await response.json();
            return this._normalizeCurrentWeather(data);
        } catch (error) {
            if (error.message.includes('fetch')) {
                throw new Error('Network error. Please check your internet connection and try again.');
            }
            throw error;
        }
    },

    // Get weather forecast by city name
    async getForecast(city) {
        if (!this.config.baseUrl || !this.config.apiKey) {
            throw new Error('Weather forecast API configuration not provided. Please configure API endpoints and key.');
        }

        try {
            const url = this._buildUrl('forecast', { q: city, days: 5 });
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Forecast for "${city}" not found. Please check the spelling and try again.`);
                } else {
                    throw new Error(`Failed to fetch forecast data (${response.status}). Please try again.`);
                }
            }

            const data = await response.json();
            return this._normalizeForecast(data);
        } catch (error) {
            if (error.message.includes('fetch')) {
                throw new Error('Network error. Please check your internet connection and try again.');
            }
            throw error;
        }
    },

    // Get weather forecast by coordinates
    async getForecastByCoords(lat, lon) {
        if (!this.config.baseUrl || !this.config.apiKey) {
            throw new Error('Weather forecast API configuration not provided. Please configure API endpoints and key.');
        }

        try {
            const url = this._buildUrl('forecast', { lat, lon, days: 5 });
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch forecast data for your location (${response.status}).`);
            }

            const data = await response.json();
            return this._normalizeForecast(data);
        } catch (error) {
            if (error.message.includes('fetch')) {
                throw new Error('Network error. Please check your internet connection and try again.');
            }
            throw error;
        }
    },

    // Build API URL with parameters
    _buildUrl(endpoint, params) {
        const baseUrl = this.config.baseUrl;
        const endpointPath = this.config.endpoints[endpoint] || endpoint;
        let url = `${baseUrl}/${endpointPath}`;

        // Add API key
        const separator = url.includes('?') ? '&' : '?';
        url += `${separator}key=${this.config.apiKey}`;

        // Add other parameters
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url += `&${key}=${encodeURIComponent(value)}`;
            }
        });

        return url;
    },

    // Normalize current weather response to common format
    _normalizeCurrentWeather(data) {
        // WeatherAPI.com specific normalization
        return {
            location: data.location?.name || 'Unknown Location',
            temperature: data.current?.temp_c || null,
            feelsLike: data.current?.feelslike_c || null,
            condition: data.current?.condition?.text || 'Unknown',
            description: data.current?.condition?.text || 'No description available',
            humidity: data.current?.humidity || null,
            windSpeed: data.current?.wind_kph || null,
            pressure: data.current?.pressure_mb || null,
            visibility: data.current?.vis_km || null,
            uvIndex: data.current?.uv || null,
            lastUpdated: data.current?.last_updated || new Date().toISOString()
        };
    },

    // Normalize forecast response to common format
    _normalizeForecast(data) {
        const forecastDays = data.forecast?.forecastday || [];
        
        if (!Array.isArray(forecastDays)) {
            return [];
        }

        return forecastDays.slice(0, 5).map(day => {
            // WeatherAPI.com specific format
            const dayData = day.day || {};
            
            return {
                date: day.date || new Date().toISOString().split('T')[0],
                high: dayData.maxtemp_c || null,
                low: dayData.mintemp_c || null,
                condition: dayData.condition?.text || 'Unknown',
                description: dayData.condition?.text || 'No description available'
            };
        });
    }
};

// Auto-initialize with WeatherAPI.com configuration
document.addEventListener('DOMContentLoaded', async () => {
    // WeatherAPI.com configuration
    let config = {
        apiKey: '',
        baseUrl: 'https://api.weatherapi.com/v1',
        endpoints: {
            current: 'current.json',
            forecast: 'forecast.json'
        }
    };

    // Try multiple ways to get API key
    // 1. Try server endpoint (Replit environment)
    try {
        const response = await fetch('/api/config');
        if (response.ok) {
            const data = await response.json();
            if (data.apiKey) {
                config.apiKey = data.apiKey;
            }
        }
    } catch (error) {
        console.log('Server config not available (normal for local development)');
    }

    // 2. Try local config file (local development)
    if (!config.apiKey && window.WEATHER_CONFIG) {
        config.apiKey = window.WEATHER_CONFIG.apiKey;
        config.baseUrl = window.WEATHER_CONFIG.baseUrl;
    }

    // 3. Try environment variables (if available)
    if (!config.apiKey && window.WEATHER_API_KEY) {
        config.apiKey = window.WEATHER_API_KEY;
    }

    // Initialize if we have an API key
    if (config.apiKey && config.apiKey !== 'YOUR_API_KEY_HERE') {
        WeatherService.init(config);
        console.log('Weather service initialized successfully');
    } else {
        console.warn('Weather API key not configured. Please update config.js with your API key.');
    }
});
