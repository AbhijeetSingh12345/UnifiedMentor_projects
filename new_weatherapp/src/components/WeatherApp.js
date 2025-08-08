import React, { useState, useEffect } from 'react';
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sun, Cloud, CloudRain, CloudSnow, Zap } from 'lucide-react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Major Indian cities
  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
    'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
    'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar',
    'Varanasi', 'Srinagar', 'Dhanbad', 'Jodhpur', 'Amritsar', 'Raipur', 'Allahabad',
    'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Madurai', 'Guwahati', 'Chandigarh',
    'Hubli-Dharwad', 'Mysore', 'Tiruchirappalli', 'Bareilly', 'Aligarh', 'Tiruppur',
    'Moradabad', 'Jalandhar', 'Bhubaneswar', 'Salem', 'Warangal', 'Guntur', 'Bhiwandi',
    'Saharanpur', 'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai',
    'Cuttack', 'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur',
    'Asansol', 'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar',
    'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Jammu', 'Sangli-Miraj & Kupwad',
    'Mangalore', 'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon',
    'Udaipur', 'Maheshtala'
  ];

  // OpenWeatherMap API key - Replace with your actual API key from openweathermap.org
  const API_KEY = '23566c06a3394cd73ec753525c9296e4';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  // To get accurate temperature data:
  // 1. Go to https://openweathermap.org/api
  // 2. Sign up for a free account
  // 3. Get your API key from your account page
  // 4. Replace 'your_api_key_here' above with your actual API key
  // 5. Uncomment the real API call in fetchWeather function below

  // Mock weather data for Indian cities
  const mockWeatherData = {
    name: 'Mumbai',
    sys: { country: 'IN' },
    main: {
      temp: 28,
      feels_like: 32,
      humidity: 78,
      pressure: 1012
    },
    weather: [{
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d'
    }],
    wind: { speed: 4.2 },
    visibility: 8000,
    dt: Date.now() / 1000
  };

  // Filter cities based on input
  const filteredCities = indianCities.filter(cityName =>
    cityName.toLowerCase().includes(city.toLowerCase()) && city.length > 0
  ).slice(0, 5);

  const validateIndianCity = (cityName) => {
    return indianCities.some(indianCity => 
      indianCity.toLowerCase() === cityName.toLowerCase()
    );
  };

  const getWeatherIcon = (weatherMain, iconCode) => {
    const iconClass = "w-16 h-16 mx-auto mb-4";
    
    if (iconCode?.includes('d')) {
      // Daytime icons
      switch (weatherMain?.toLowerCase()) {
        case 'clear': return <Sun className={`${iconClass} text-yellow-500`} />;
        case 'clouds': return <Cloud className={`${iconClass} text-gray-400`} />;
        case 'rain': return <CloudRain className={`${iconClass} text-blue-500`} />;
        case 'snow': return <CloudSnow className={`${iconClass} text-blue-200`} />;
        case 'thunderstorm': return <Zap className={`${iconClass} text-purple-500`} />;
        default: return <Sun className={`${iconClass} text-yellow-500`} />;
      }
    } else {
      // Nighttime - use slightly different colors
      switch (weatherMain?.toLowerCase()) {
        case 'clear': return <Sun className={`${iconClass} text-yellow-300`} />;
        case 'clouds': return <Cloud className={`${iconClass} text-gray-500`} />;
        case 'rain': return <CloudRain className={`${iconClass} text-blue-400`} />;
        case 'snow': return <CloudSnow className={`${iconClass} text-blue-100`} />;
        case 'thunderstorm': return <Zap className={`${iconClass} text-purple-400`} />;
        default: return <Sun className={`${iconClass} text-yellow-300`} />;
      }
    }
  };

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;
    
    // Validate if it's an Indian city
    if (!validateIndianCity(cityName)) {
      setError('Please enter a valid Indian city name.');
      return;
    }
    
    setLoading(true);
    setError('');
    setShowSuggestions(false);
    
    try {
      // UNCOMMENT THESE LINES FOR REAL WEATHER DATA:
      // Replace 'your_api_key_here' with your actual OpenWeatherMap API key
      
      if (API_KEY !== '23566c06a3394cd73ec753525c9296e4') {
        // Real API call for accurate weather data
        const response = await fetch(`${BASE_URL}?q=${cityName},IN&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
          throw new Error('City not found or API error');
        }
        const data = await response.json();
        setWeather(data);
      } else {
        // Demo mode with mock data (remove this when using real API)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for demonstration - THIS IS NOT REAL WEATHER DATA
        const mockData = {
          name: cityName,
          sys: { country: 'IN' },
          main: {
            temp: Math.round(Math.random() * 20 + 15), // Random temp - NOT ACCURATE
            feels_like: Math.round(Math.random() * 20 + 17),
            humidity: Math.round(Math.random() * 40 + 40),
            pressure: Math.round(Math.random() * 50 + 1000)
          },
          weather: [{
            main: ['Clear', 'Clouds', 'Rain', 'Haze'][Math.floor(Math.random() * 4)],
            description: ['clear sky', 'few clouds', 'light rain', 'haze'][Math.floor(Math.random() * 4)],
            icon: '01d'
          }],
          wind: { speed: Math.round(Math.random() * 10 + 2) },
          visibility: Math.round(Math.random() * 5000 + 5000),
          dt: Date.now() / 1000
        };
        
        setWeather(mockData);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    fetchWeather(city);
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setShowSuggestions(false);
    fetchWeather(selectedCity);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setShowSuggestions(true);
    setError('');
  };

  // Load default city on component mount
  useEffect(() => {
    fetchWeather('Mumbai');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2">Indian Weather App</h1>
          <p className="text-blue-100">Get current weather conditions for Indian cities</p>
        </div>

        {/* Search Input */}
        <div className="mb-8 relative">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Enter Indian city name..."
              className="w-full px-4 py-3 pl-12 rounded-xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="absolute right-2 top-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>

          {/* City Suggestions Dropdown */}
          {showSuggestions && filteredCities.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 mt-1 z-10 max-h-60 overflow-y-auto">
              {filteredCities.map((cityName, index) => (
                <div
                  key={index}
                  onClick={() => handleCitySelect(cityName)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 text-gray-700"
                >
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    {cityName}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick City Selection */}
        <div className="mb-6">
          <p className="text-blue-100 text-sm mb-3 text-center">Popular Indian Cities:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'].map((cityName) => (
              <button
                key={cityName}
                onClick={() => handleCitySelect(cityName)}
                disabled={loading}
                className="px-3 py-1 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            {/* Location */}
            <div className="flex items-center justify-center text-white mb-6">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-xl font-semibold">
                {weather.name}, {weather.sys.country}
              </span>
            </div>

            {/* Main Weather */}
            <div className="text-center mb-8">
              {getWeatherIcon(weather.weather[0].main, weather.weather[0].icon)}
              <h2 className="text-4xl font-bold text-white mb-2">
                {Math.round(weather.main.temp)}°C
              </h2>
              <p className="text-blue-100 text-lg capitalize">
                {weather.weather[0].description}
              </p>
              <p className="text-blue-200 text-sm mt-1">
                Feels like {Math.round(weather.main.feels_like)}°C
              </p>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Droplets className="h-6 w-6 text-blue-200 mx-auto mb-2" />
                <p className="text-blue-100 text-sm">Humidity</p>
                <p className="text-white font-semibold">{weather.main.humidity}%</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Wind className="h-6 w-6 text-blue-200 mx-auto mb-2" />
                <p className="text-blue-100 text-sm">Wind Speed</p>
                <p className="text-white font-semibold">{weather.wind.speed} m/s</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Gauge className="h-6 w-6 text-blue-200 mx-auto mb-2" />
                <p className="text-blue-100 text-sm">Pressure</p>
                <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Eye className="h-6 w-6 text-blue-200 mx-auto mb-2" />
                <p className="text-blue-100 text-sm">Visibility</p>
                <p className="text-white font-semibold">{Math.round(weather.visibility / 1000)} km</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center mt-6 text-blue-100 text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-white/20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading weather data...</p>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default WeatherApp;