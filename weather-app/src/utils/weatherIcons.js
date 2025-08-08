import React from 'react';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle, 
  CloudFog 
} from 'lucide-react';

export const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun size={24} className="icon-sun" />;
    case 'clouds':
      return <Cloud size={24} className="icon-cloud" />;
    case 'rain':
      return <CloudRain size={24} className="icon-rain" />;
    case 'drizzle':
      return <CloudDrizzle size={24} className="icon-drizzle" />;
    case 'thunderstorm':
      return <CloudLightning size={24} className="icon-thunder" />;
    case 'snow':
      return <CloudSnow size={24} className="icon-snow" />;
    case 'mist':
    case 'fog':
      return <CloudFog size={24} className="icon-fog" />;
    default:
      return <Cloud size={24} className="icon-cloud" />;
  }
};
