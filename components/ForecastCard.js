const ForecastCard = {
    props: {
        forecast: {
            type: Object,
            required: true
        },
        unit: {
            type: String,
            default: 'celsius'
        }
    },
    template: `
        <div class="forecast-card">
            <div class="forecast-date">{{ formatDate(forecast.date) }}</div>
            <div class="forecast-icon">
                <i :class="getWeatherIcon(forecast.condition)"></i>
            </div>
            <div class="forecast-temps">
                <span class="temp-high">{{ getTemperature(forecast.high) }}°</span>
                <span class="temp-low">{{ getTemperature(forecast.low) }}°</span>
            </div>
            <div class="forecast-desc">{{ forecast.description }}</div>
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
        
        formatDate(dateString) {
            if (!dateString) return 'Unknown';
            
            try {
                // Handle WeatherAPI date format: "2025-07-23"
                let date;
                if (typeof dateString === 'string') {
                    // Ensure proper ISO format
                    if (dateString.includes('T')) {
                        date = new Date(dateString);
                    } else {
                        date = new Date(dateString + 'T00:00:00');
                    }
                } else {
                    date = new Date(dateString);
                }
                
                // Check if date is valid
                if (isNaN(date.getTime())) {
                    return 'Unknown';
                }
                
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                // Reset time to compare only dates
                const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
                
                if (dateOnly.getTime() === todayOnly.getTime()) {
                    return 'Today';
                } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
                    return 'Tomorrow';
                } else {
                    return date.toLocaleDateString([], { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                    });
                }
            } catch (error) {
                return 'Unknown';
            }
        }
    }
};
