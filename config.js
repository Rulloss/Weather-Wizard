// Weather API Configuration
// Bu dosyayı kendi API key'iniz ile güncelleyin
const WEATHER_CONFIG = {
    apiKey: '1c8afe1a912b4494b34153647252307', // WeatherAPI.com'dan aldığınız API key'i buraya yazın
    baseUrl: 'https://api.weatherapi.com/v1'
};

// Global olarak erişilebilir hale getir
window.WEATHER_CONFIG = WEATHER_CONFIG;