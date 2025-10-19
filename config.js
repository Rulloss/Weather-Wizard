// Weather API Configuration
// Bu dosyayı kendi API key'iniz ile güncelleyin
const WEATHER_CONFIG = {
    apiKey: 'API_KEY', // WeatherAPI.com'dan aldığınız API key'i buraya yazın
    baseUrl: 'BASE_URL'
};

// Global olarak erişilebilir hale getir
window.WEATHER_CONFIG = WEATHER_CONFIG;