const WeatherCard = {
    props: {
        weather: {
            type: Object,
            required: true
        },
        unit: {
            type: String,
            default: 'celsius'
        }
    },
    template: `
        <div class="weather-card">
            <div class="weather-main">
                <div class="weather-icon">
                    <i :class="getWeatherIcon(weather.condition)"></i>
                </div>
                <div class="weather-info">
                    <h2>{{ weather.location }}</h2>
                    <p>{{ weather.description }}</p>
                    <p class="last-updated">Updated: {{ formatTime(weather.lastUpdated) }}</p>
                </div>
                <div class="temperature">
                    {{ getTemperature(weather.temperature) }}°
                </div>
            </div>
            
            <div class="weather-details">
                <div class="detail-item">
                    <i class="fas fa-eye"></i>
                    <div class="detail-content">
                        <h4>Visibility</h4>
                        <span>{{ weather.visibility || 'N/A' }} km</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tint"></i>
                    <div class="detail-content">
                        <h4>Humidity</h4>
                        <span>{{ weather.humidity || 'N/A' }}%</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-wind"></i>
                    <div class="detail-content">
                        <h4>Wind Speed</h4>
                        <span>{{ weather.windSpeed || 'N/A' }} km/h</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-thermometer-half"></i>
                    <div class="detail-content">
                        <h4>Feels Like</h4>
                        <span>{{ getTemperature(weather.feelsLike) }}°</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-compress-arrows-alt"></i>
                    <div class="detail-content">
                        <h4>Pressure</h4>
                        <span>{{ weather.pressure || 'N/A' }} hPa</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-sun"></i>
                    <div class="detail-content">
                        <h4>UV Index</h4>
                        <span>{{ weather.uvIndex || 'N/A' }}</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        getWeatherIcon(condition) {
            if (!condition) return 'fas fa-cloud';
            
            const normalizedCondition = condition.toLowerCase();
            
            // WeatherAPI condition mappings
            if (normalizedCondition.includes('sunny') || normalizedCondition.includes('clear')) {
                return 'fas fa-sun';
            }
            if (normalizedCondition.includes('partly cloudy') || normalizedCondition.includes('partial')) {
                return 'fas fa-cloud-sun';
            }
            if (normalizedCondition.includes('cloudy') || normalizedCondition.includes('overcast')) {
                return 'fas fa-cloud';
            }
            if (normalizedCondition.includes('rain') || normalizedCondition.includes('shower')) {
                return 'fas fa-cloud-rain';
            }
            if (normalizedCondition.includes('drizzle') || normalizedCondition.includes('light rain')) {
                return 'fas fa-cloud-drizzle';
            }
            if (normalizedCondition.includes('heavy rain') || normalizedCondition.includes('downpour')) {
                return 'fas fa-cloud-showers-heavy';
            }
            if (normalizedCondition.includes('thunder') || normalizedCondition.includes('storm')) {
                return 'fas fa-bolt';
            }
            if (normalizedCondition.includes('snow') || normalizedCondition.includes('blizzard')) {
                return 'fas fa-snowflake';
            }
            if (normalizedCondition.includes('fog') || normalizedCondition.includes('mist') || normalizedCondition.includes('haze')) {
                return 'fas fa-smog';
            }
            if (normalizedCondition.includes('wind')) {
                return 'fas fa-wind';
            }
            
            // Default fallback
            return 'fas fa-cloud';
        },
        
        getTemperature(temp) {
            if (temp === null || temp === undefined) return 'N/A';
            
            if (this.unit === 'fahrenheit') {
                return Math.round((temp * 9/5) + 32);
            }
            return Math.round(temp);
        },
        
        formatTime(timestamp) {
            if (!timestamp) return 'Unknown';
            
            try {
                // Handle different timestamp formats from WeatherAPI
                let date;
                if (typeof timestamp === 'string') {
                    // WeatherAPI format: "2025-07-23 18:30"
                    date = new Date(timestamp.replace(' ', 'T'));
                } else if (typeof timestamp === 'number') {
                    // Unix timestamp
                    date = new Date(timestamp * 1000);
                } else {
                    date = new Date(timestamp);
                }
                
                // Check if date is valid
                if (isNaN(date.getTime())) {
                    return 'Unknown';
                }
                
                return date.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                });
            } catch (error) {
                return 'Unknown';
            }
        }
    }
};
