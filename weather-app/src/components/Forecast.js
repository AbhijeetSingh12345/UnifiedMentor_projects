import { getWeatherIcon } from '../utils/weatherIcons';
import '../styles/Forecast.css';

export default function Forecast({ forecast }) {
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="forecast">
      {forecast.map((day, index) => (
        <div key={index} className="forecast-day">
          <div className="day-name">{getDayName(day.date)}</div>
          <div className="day-icon">
            {getWeatherIcon(day.condition)}
          </div>
          <div className="day-temp">{day.high}° / {day.low}°</div>
        </div>
      ))}
    </div>
  );
}
