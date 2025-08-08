import { getWeatherIcon } from '../utils/weatherIcons';
import { Wind } from 'lucide-react';
import '../styles/CurrentWeather.css';

export default function CurrentWeather({ weather, city }) {
  return (
    <div className="current-weather">
      <div className="weather-header">
        <h2 className="city-name">{city}</h2>
        <span className="current-date">{new Date().toLocaleDateString()}</span>
      </div>
      
      <div className="weather-main">
        <div className="weather-condition">
          {getWeatherIcon(weather.condition)}
          <span className="condition-text">{weather.condition}</span>
        </div>
        <div className="temperature">{weather.temp}°</div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-label">Humidity</div>
          <div className="detail-value">{weather.humidity}%</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Wind</div>
          <div className="detail-value">
            <Wind size={14} className="wind-icon" />
            {weather.wind} mph
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Feels Like</div>
          <div className="detail-value">{weather.feelsLike}°</div>
        </div>
      </div>
    </div>
  );
}
