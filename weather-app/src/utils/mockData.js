export function getMockWeatherData(city) {
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
  }