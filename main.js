const { createApp, ref, onMounted } = Vue;

createApp({
    components: {
        'search-bar': SearchBar,
        'weather-card': WeatherCard,
        'forecast-card': ForecastCard,
        'loading-spinner': LoadingSpinner
    },
    setup() {
        // Reactive state
        const currentWeather = ref(null);
        const forecast = ref([]);
        const loading = ref(false);
        const error = ref('');
        const temperatureUnit = ref('celsius');

        // Search handler
        const handleSearch = async (city) => {
            if (!city.trim()) {
                error.value = 'Please enter a city name';
                return;
            }

            loading.value = true;
            error.value = '';
            
            try {
                // Get current weather
                const weather = await WeatherService.getCurrentWeather(city);
                currentWeather.value = weather;

                // Get forecast
                const forecastData = await WeatherService.getForecast(city);
                forecast.value = forecastData;

            } catch (err) {
                error.value = err.message || 'Failed to fetch weather data. Please check if API endpoints are configured.';
                currentWeather.value = null;
                forecast.value = [];
            } finally {
                loading.value = false;
            }
        };

        // Toggle temperature unit
        const toggleUnit = () => {
            temperatureUnit.value = temperatureUnit.value === 'celsius' ? 'fahrenheit' : 'celsius';
        };

        // Get user's location on mount
        onMounted(async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        loading.value = true;
                        
                        try {
                            const weather = await WeatherService.getCurrentWeatherByCoords(latitude, longitude);
                            currentWeather.value = weather;

                            const forecastData = await WeatherService.getForecastByCoords(latitude, longitude);
                            forecast.value = forecastData;
                        } catch (err) {
                            error.value = 'Could not fetch weather for your location. Please search for a city manually.';
                        } finally {
                            loading.value = false;
                        }
                    },
                    (err) => {
                        console.log('Geolocation not available or denied');
                    }
                );
            }
        });

        return {
            currentWeather,
            forecast,
            loading,
            error,
            temperatureUnit,
            handleSearch,
            toggleUnit
        };
    }
}).mount('#app');
