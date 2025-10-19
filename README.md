# Vue.js Hava Durumu Uygulaması

Modern, responsive bir hava durumu uygulaması Vue.js 3 ile geliştirilmiştir.

## Özellikler

- ✅ Gerçek zamanlı hava durumu verileri
- ✅ 5 günlük hava tahmini
- ✅ Sıcaklık birimi değiştirme (°C/°F)
- ✅ Responsive tasarım
- ✅ Hava durumuna uygun ikonlar
- ✅ Şehir arama fonksiyonu

## Kurulum

### 1. Projeyi İndirin
```bash
# Projeyi bilgisayarınıza indirin veya kopyalayın
```

### 2. API Key Ayarlayın
1. [WeatherAPI.com](https://www.weatherapi.com/) sitesine gidin
2. Ücretsiz hesap oluşturun
3. API key'inizi alın
4. `config.js` dosyasını açın
5. `YOUR_API_KEY_HERE` yerine kendi API key'inizi yazın:

```javascript
const WEATHER_CONFIG = {
    apiKey: 'buraya-kendi-api-keyinizi-yazin',
    baseUrl: 'https://api.weatherapi.com/v1'
};
```

### 3. Uygulamayı Çalıştırın

#### Basit HTTP Server ile:
```bash
# Python 3 ile
python -m http.server 8000

# Node.js ile
npx serve .
```

#### Live Server (VS Code) ile:
1. VS Code'da Live Server eklentisini yükleyin
2. `index.html` dosyasına sağ tıklayın
3. "Open with Live Server" seçin

#### Dosya Sistemi ile (Sınırlı):
- `index.html` dosyasını tarayıcıda açabilirsiniz, ancak API çağrıları CORS nedeniyle çalışmayabilir

## Dosya Yapısı

```
weather-app/
├── index.html              # Ana HTML dosyası
├── style.css               # Stil dosyası
├── main.js                 # Ana uygulama mantığı
├── config.js               # API yapılandırması
├── components/
│   ├── SearchBar.js        # Arama bileşeni
│   ├── WeatherCard.js      # Mevcut hava durumu kartı
│   ├── ForecastCard.js     # Tahmin kartı
│   └── LoadingSpinner.js   # Yüklenme göstergesi
├── services/
│   └── weatherService.js   # API servis katmanı
└── utils/
    └── helpers.js          # Yardımcı fonksiyonlar
```

## Kullanım

1. Arama çubuğuna şehir adı yazın (örn: İstanbul, Ankara, London)
2. "Search" butonuna tıklayın veya Enter tuşuna basın
3. Mevcut hava durumu ve 5 günlük tahmin görüntülenecek
4. Sağ üstteki °C/°F butonları ile sıcaklık birimini değiştirebilirsiniz

## Sorun Giderme

### "Could not fetch weather for your location" Hatası
- `config.js` dosyasında API key'inizi doğru yazdığınızdan emin olun
- WeatherAPI.com'dan aldığınız key'in aktif olduğunu kontrol edin
- İnternet bağlantınızı kontrol edin

### API Çağrıları Çalışmıyor
- Uygulamayı HTTP server ile çalıştırdığınızdan emin olun (dosya:// protokolü CORS sorunlarına neden olabilir)
- Tarayıcı konsolunda hata mesajlarını kontrol edin

### Görsel Sorunlar
- Tarayıcı önbelleğini temizlemeyi deneyin (Ctrl+F5)
- Tüm CSS ve JS dosyalarının doğru yüklendiğini kontrol edin

## Teknolojiler

- **Vue.js 3** - Frontend framework
- **WeatherAPI.com** - Hava durumu verileri
- **Font Awesome** - İkonlar
- **Vanilla CSS** - Stil
- **ES6+ JavaScript** - Modern JavaScript

## Lisans

Bu proje eğitim amaçlı geliştirilmiştir.