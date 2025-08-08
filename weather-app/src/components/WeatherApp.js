// import { useState, useEffect } from 'react';
// import { Search, Loader, Cloud, CloudRain, Sun, CloudSnow, CloudLightning, CloudDrizzle, CloudFog, Wind } from 'lucide-react';

// export default function WeatherApp() {
//   const [city, setCity] = useState('');
//   const [searchedCity, setSearchedCity] = useState('New York');
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Get weather icon component based on condition
//   const getWeatherIcon = (condition) => {
//     switch (condition.toLowerCase()) {
//       case 'clear':
//         return <Sun size={24} style={{ color: '#ffc107' }} />;
//       case 'clouds':
//         return <Cloud size={24} style={{ color: '#78909c' }} />;
//       case 'rain':
//         return <CloudRain size={24} style={{ color: '#42a5f5' }} />;
//       case 'drizzle':
//         return <CloudDrizzle size={24} style={{ color: '#64b5f6' }} />;
//       case 'thunderstorm':
//         return <CloudLightning size={24} style={{ color: '#7e57c2' }} />;
//       case 'snow':
//         return <CloudSnow size={24} style={{ color: '#e1f5fe' }} />;
//       case 'mist':
//       case 'fog':
//         return <CloudFog size={24} style={{ color: '#b0bec5' }} />;
//       default:
//         return <Cloud size={24} style={{ color: '#78909c' }} />;
//     }
//   };

//   // Get day name from date string
//   const getDayName = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { weekday: 'short' });
//   };

//   // Mock weather data
//   const getMockWeatherData = (city) => {
//     // For demo purposes, we'll handle a few cities
//     const cityData = {
//       'new york': {
//         current: {
//           temp: 72,
//           feelsLike: 74,
//           condition: 'Clear',
//           humidity: 65,
//           wind: 8
//         },
//         forecast: [
//           { date: '2025-04-14', high: 74, low: 62, condition: 'Clear' },
//           { date: '2025-04-15', high: 78, low: 64, condition: 'Clouds' },
//           { date: '2025-04-16', high: 80, low: 68, condition: 'Clear' },
//           { date: '2025-04-17', high: 77, low: 65, condition: 'Rain' },
//           { date: '2025-04-18', high: 72, low: 60, condition: 'Clouds' }
//         ]
//       },
//       'london': {
//         current: {
//           temp: 59,
//           feelsLike: 57,
//           condition: 'Rain',
//           humidity: 82,
//           wind: 12
//         },
//         forecast: [
//           { date: '2025-04-14', high: 61, low: 52, condition: 'Rain' },
//           { date: '2025-04-15', high: 64, low: 53, condition: 'Clouds' },
//           { date: '2025-04-16', high: 62, low: 54, condition: 'Drizzle' },
//           { date: '2025-04-17', high: 66, low: 55, condition: 'Clouds' },
//           { date: '2025-04-18', high: 68, low: 56, condition: 'Clear' }
//         ]
//       },
//       'tokyo': {
//         current: {
//           temp: 68,
//           feelsLike: 70,
//           condition: 'Clouds',
//           humidity: 70,
//           wind: 6
//         },
//         forecast: [
//           { date: '2025-04-14', high: 70, low: 62, condition: 'Clouds' },
//           { date: '2025-04-15', high: 72, low: 63, condition: 'Rain' },
//           { date: '2025-04-16', high: 75, low: 65, condition: 'Clear' },
//           { date: '2025-04-17', high: 76, low: 66, condition: 'Clear' },
//           { date: '2025-04-18', high: 74, low: 65, condition: 'Clouds' }
//         ]
//       },
//       'sydney': {
//         current: {
//           temp: 77,
//           feelsLike: 79,
//           condition: 'Clear',
//           humidity: 58,
//           wind: 10
//         },
//         forecast: [
//           { date: '2025-04-14', high: 79, low: 68, condition: 'Clear' },
//           { date: '2025-04-15', high: 81, low: 69, condition: 'Clear' },
//           { date: '2025-04-16', high: 78, low: 67, condition: 'Clouds' },
//           { date: '2025-04-17', high: 76, low: 65, condition: 'Rain' },
//           { date: '2025-04-18', high: 75, low: 64, condition: 'Clouds' }
//         ]
//       }
//     };
  
//     // Convert to lowercase for case-insensitive matching
//     const normalizedCity = city.toLowerCase();
    
//     // Check if we have data for the requested city
//     if (cityData[normalizedCity]) {
//       return cityData[normalizedCity];
//     }
    
//     // Return mock data for default case or error
//     if (normalizedCity === '') {
//       return { error: 'Please enter a city name' };
//     }
    
//     // Try to appear somewhat random for cities we don't have data for
//     const firstChar = normalizedCity.charCodeAt(0) % 4;
//     const cities = Object.keys(cityData);
//     const randomCity = cities[firstChar];
    
//     // Return data for a random city but with the searched city name
//     return cityData[randomCity];
//   };

//   // Effect to fetch weather data
//   useEffect(() => {
//     setLoading(true);
    
//     // Simulate API request delay
//     setTimeout(() => {
//       const mockData = getMockWeatherData(searchedCity);
//       if (mockData.error) {
//         setError(mockData.error);
//         setWeather(null);
//         setForecast([]);
//       } else {
//         setWeather(mockData.current);
//         setForecast(mockData.forecast);
//         setError('');
//       }
//       setLoading(false);
//     }, 800);
//   }, [searchedCity]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (city.trim()) {
//       setSearchedCity(city);
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: '500px',
//       width: '100%',
//       background: 'linear-gradient(to bottom right, #e0f7fa, #e1f5fe)',
//       padding: '24px',
//       borderRadius: '12px',
//       boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
//     }}>
//       <h1 style={{
//         fontSize: '1.5rem',
//         fontWeight: '700',
//         textAlign: 'center',
//         marginBottom: '24px',
//         color: '#1565c0'
//       }}>Weather App</h1>
      
//       <form onSubmit={handleSearch} style={{
//         display: 'flex',
//         marginBottom: '24px'
//       }}>
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city name"
//           style={{
//             flexGrow: 1,
//             padding: '8px 12px',
//             border: '1px solid #bbdefb',
//             borderRight: 'none',
//             borderRadius: '6px 0 0 6px',
//             fontSize: '14px',
//             outline: 'none'
//           }}
//         />
//         <button 
//           type="submit" 
//           style={{
//             backgroundColor: '#1976d2',
//             color: 'white',
//             border: 'none',
//             padding: '8px 16px',
//             borderRadius: '0 6px 6px 0',
//             fontSize: '14px',
//             display: 'flex',
//             alignItems: 'center',
//             cursor: 'pointer'
//           }}
//         >
//           <Search size={18} style={{ marginRight: '4px' }} />
//           Search
//         </button>
//       </form>

//       {loading ? (
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '200px'
//         }}>
//           <Loader size={40} style={{ 
//             color: '#1976d2',
//             animation: 'spin 1.5s linear infinite' 
//           }} />
//         </div>
//       ) : error ? (
//         <div style={{
//           textAlign: 'center',
//           padding: '24px',
//           backgroundColor: '#ffebee',
//           borderRadius: '8px'
//         }}>
//           <p style={{ color: '#c62828', fontSize: '1rem' }}>{error}</p>
//         </div>
//       ) : weather ? (
//         <div>
//           <div style={{
//             backgroundColor: 'white',
//             padding: '20px',
//             borderRadius: '8px',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
//             marginBottom: '24px'
//           }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '16px'
//             }}>
//               <h2 style={{
//                 fontSize: '1.25rem',
//                 fontWeight: '600',
//                 color: '#333'
//               }}>{searchedCity}</h2>
//               <span style={{
//                 color: '#757575',
//                 fontSize: '0.875rem'
//               }}>{new Date().toLocaleDateString()}</span>
//             </div>
            
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '20px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center'
//               }}>
//                 {getWeatherIcon(weather.condition)}
//                 <span style={{
//                   marginLeft: '8px',
//                   fontSize: '1.125rem',
//                   color: '#424242'
//                 }}>{weather.condition}</span>
//               </div>
//               <div style={{
//                 fontSize: '2.5rem',
//                 fontWeight: '700',
//                 color: '#212121'
//               }}>{weather.temp}°</div>
//             </div>
            
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(3, 1fr)',
//               gap: '8px'
//             }}>
//               <div style={{
//                 backgroundColor: '#f5f7fa',
//                 padding: '8px',
//                 borderRadius: '6px',
//                 textAlign: 'center'
//               }}>
//                 <div style={{
//                   fontSize: '0.75rem',
//                   color: '#757575',
//                   marginBottom: '4px'
//                 }}>Humidity</div>
//                 <div style={{
//                   fontWeight: '500',
//                   color: '#424242'
//                 }}>{weather.humidity}%</div>
//               </div>
//               <div style={{
//                 backgroundColor: '#f5f7fa',
//                 padding: '8px',
//                 borderRadius: '6px',
//                 textAlign: 'center'
//               }}>
//                 <div style={{
//                   fontSize: '0.75rem',
//                   color: '#757575',
//                   marginBottom: '4px'
//                 }}>Wind</div>
//                 <div style={{
//                   fontWeight: '500',
//                   color: '#424242',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}>
//                   <Wind size={14} style={{ marginRight: '4px' }} />
//                   {weather.wind} mph
//                 </div>
//               </div>
//               <div style={{
//                 backgroundColor: '#f5f7fa',
//                 padding: '8px',
//                 borderRadius: '6px',
//                 textAlign: 'center'
//               }}>
//                 <div style={{
//                   fontSize: '0.75rem',
//                   color: '#757575',
//                   marginBottom: '4px'
//                 }}>Feels Like</div>
//                 <div style={{
//                   fontWeight: '500',
//                   color: '#424242'
//                 }}>{weather.feelsLike}°</div>
//               </div>
//             </div>
//           </div>
          
//           <h3 style={{
//             fontSize: '1.125rem',
//             fontWeight: '500',
//             marginBottom: '12px',
//             color: '#1565c0'
//           }}>5-Day Forecast</h3>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(5, 1fr)',
//             gap: '8px'
//           }}>
//             {forecast.map((day, index) => (
//               <div key={index} style={{
//                 backgroundColor: 'white',
//                 padding: '8px',
//                 borderRadius: '6px',
//                 textAlign: 'center',
//                 boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
//               }}>
//                 <div style={{
//                   fontSize: '0.875rem',
//                   fontWeight: '500',
//                   marginBottom: '4px',
//                   color: '#424242'
//                 }}>{getDayName(day.date)}</div>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   marginBottom: '4px'
//                 }}>
//                   {getWeatherIcon(day.condition)}
//                 </div>
//                 <div style={{
//                   fontSize: '0.875rem',
//                   color: '#555'
//                 }}>{day.high}° / {day.low}°</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Search, Loader, Cloud, CloudRain, Sun, CloudSnow, CloudLightning, CloudDrizzle, CloudFog, Wind } from 'lucide-react';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [searchedCity, setSearchedCity] = useState('New York');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (tempF) => {
    return Math.round((tempF - 32) * 5 / 9);
  };

  // Get weather icon component based on condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun size={24} style={{ color: '#ffc107' }} />;
      case 'clouds':
        return <Cloud size={24} style={{ color: '#78909c' }} />;
      case 'rain':
        return <CloudRain size={24} style={{ color: '#42a5f5' }} />;
      case 'drizzle':
        return <CloudDrizzle size={24} style={{ color: '#64b5f6' }} />;
      case 'thunderstorm':
        return <CloudLightning size={24} style={{ color: '#7e57c2' }} />;
      case 'snow':
        return <CloudSnow size={24} style={{ color: '#e1f5fe' }} />;
      case 'mist':
      case 'fog':
        return <CloudFog size={24} style={{ color: '#b0bec5' }} />;
      default:
        return <Cloud size={24} style={{ color: '#78909c' }} />;
    }
  };

  // Get day name from date string
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Mock weather data
  const getMockWeatherData = (city) => {
    // For demo purposes, we'll handle a few cities
    const cityData = {
      'new york': {
        current: {
          temp: 72,
          feelsLike: 74,
          condition: 'Clear',
          humidity: 65,
          wind: 8
        },
        forecast: [
          { date: '2025-04-14', high: 74, low: 62, condition: 'Clear' },
          { date: '2025-04-15', high: 78, low: 64, condition: 'Clouds' },
          { date: '2025-04-16', high: 80, low: 68, condition: 'Clear' },
          { date: '2025-04-17', high: 77, low: 65, condition: 'Rain' },
          { date: '2025-04-18', high: 72, low: 60, condition: 'Clouds' }
        ]
      },
      'london': {
        current: {
          temp: 59,
          feelsLike: 57,
          condition: 'Rain',
          humidity: 82,
          wind: 12
        },
        forecast: [
          { date: '2025-04-14', high: 61, low: 52, condition: 'Rain' },
          { date: '2025-04-15', high: 64, low: 53, condition: 'Clouds' },
          { date: '2025-04-16', high: 62, low: 54, condition: 'Drizzle' },
          { date: '2025-04-17', high: 66, low: 55, condition: 'Clouds' },
          { date: '2025-04-18', high: 68, low: 56, condition: 'Clear' }
        ]
      },
      'tokyo': {
        current: {
          temp: 68,
          feelsLike: 70,
          condition: 'Clouds',
          humidity: 70,
          wind: 6
        },
        forecast: [
          { date: '2025-04-14', high: 70, low: 62, condition: 'Clouds' },
          { date: '2025-04-15', high: 72, low: 63, condition: 'Rain' },
          { date: '2025-04-16', high: 75, low: 65, condition: 'Clear' },
          { date: '2025-04-17', high: 76, low: 66, condition: 'Clear' },
          { date: '2025-04-18', high: 74, low: 65, condition: 'Clouds' }
        ]
      },
      'sydney': {
        current: {
          temp: 77,
          feelsLike: 79,
          condition: 'Clear',
          humidity: 58,
          wind: 10
        },
        forecast: [
          { date: '2025-04-14', high: 79, low: 68, condition: 'Clear' },
          { date: '2025-04-15', high: 81, low: 69, condition: 'Clear' },
          { date: '2025-04-16', high: 78, low: 67, condition: 'Clouds' },
          { date: '2025-04-17', high: 76, low: 65, condition: 'Rain' },
          { date: '2025-04-18', high: 75, low: 64, condition: 'Clouds' }
        ]
      }
    };
  
    // Convert to lowercase for case-insensitive matching
    const normalizedCity = city.toLowerCase();
    
    // Check if we have data for the requested city
    if (cityData[normalizedCity]) {
      return cityData[normalizedCity];
    }
    
    // Return mock data for default case or error
    if (normalizedCity === '') {
      return { error: 'Please enter a city name' };
    }
    
    // Try to appear somewhat random for cities we don't have data for
    const firstChar = normalizedCity.charCodeAt(0) % 4;
    const cities = Object.keys(cityData);
    const randomCity = cities[firstChar];
    
    // Return data for a random city but with the searched city name
    return cityData[randomCity];
  };

  // Effect to fetch weather data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
      const mockData = getMockWeatherData(searchedCity);
      if (mockData.error) {
        setError(mockData.error);
        setWeather(null);
        setForecast([]);
      } else {
        setWeather(mockData.current);
        setForecast(mockData.forecast);
        setError('');
      }
      setLoading(false);
    }, 800);
  }, [searchedCity]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchedCity(city);
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      width: '100%',
      background: 'linear-gradient(to bottom right, #e0f7fa, #e1f5fe)',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '24px',
        color: '#1565c0'
      }}>Weather App</h1>
      
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        marginBottom: '24px'
      }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{
            flexGrow: 1,
            padding: '8px 12px',
            border: '1px solid #bbdefb',
            borderRight: 'none',
            borderRadius: '6px 0 0 6px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '0 6px 6px 0',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Search size={18} style={{ marginRight: '4px' }} />
          Search
        </button>
      </form>

      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px'
        }}>
          <Loader size={40} style={{ 
            color: '#1976d2',
            animation: 'spin 1.5s linear infinite' 
          }} />
        </div>
      ) : error ? (
        <div style={{
          textAlign: 'center',
          padding: '24px',
          backgroundColor: '#ffebee',
          borderRadius: '8px'
        }}>
          <p style={{ color: '#c62828', fontSize: '1rem' }}>{error}</p>
        </div>
      ) : weather ? (
        <div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#333'
              }}>{searchedCity}</h2>
              <span style={{
                color: '#757575',
                fontSize: '0.875rem'
              }}>{new Date().toLocaleDateString()}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                {getWeatherIcon(weather.condition)}
                <span style={{
                  marginLeft: '8px',
                  fontSize: '1.125rem',
                  color: '#424242'
                }}>{weather.condition}</span>
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#212121'
              }}>{fahrenheitToCelsius(weather.temp)}°C</div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px'
            }}>
              <div style={{
                backgroundColor: '#f5f7fa',
                padding: '8px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#757575',
                  marginBottom: '4px'
                }}>Humidity</div>
                <div style={{
                  fontWeight: '500',
                  color: '#424242'
                }}>{weather.humidity}%</div>
              </div>
              <div style={{
                backgroundColor: '#f5f7fa',
                padding: '8px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#757575',
                  marginBottom: '4px'
                }}>Wind</div>
                <div style={{
                  fontWeight: '500',
                  color: '#424242',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Wind size={14} style={{ marginRight: '4px' }} />
                  {Math.round(weather.wind * 1.60934)} km/h
                </div>
              </div>
              <div style={{
                backgroundColor: '#f5f7fa',
                padding: '8px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#757575',
                  marginBottom: '4px'
                }}>Feels Like</div>
                <div style={{
                  fontWeight: '500',
                  color: '#424242'
                }}>{fahrenheitToCelsius(weather.feelsLike)}°C</div>
              </div>
            </div>
          </div>
          
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '500',
            marginBottom: '12px',
            color: '#1565c0'
          }}>5-Day Forecast</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px'
          }}>
            {forecast.map((day, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '8px',
                borderRadius: '6px',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '4px',
                  color: '#424242'
                }}>{getDayName(day.date)}</div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '4px'
                }}>
                  {getWeatherIcon(day.condition)}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#555'
                }}>{fahrenheitToCelsius(day.high)}° / {fahrenheitToCelsius(day.low)}°</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}