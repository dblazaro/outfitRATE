import axios from 'axios';
import { WeatherData } from '../types';

// Use OpenWeatherMap API (free tier)
// Users will need to get their own API key from: https://openweathermap.org/api
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  /**
   * Get current weather by coordinates
   */
  async getCurrentWeather(
    latitude: number,
    longitude: number
  ): Promise<WeatherData> {
    try {
      const response = await axios.get(`${WEATHER_API_URL}/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: WEATHER_API_KEY,
          units: 'metric',
          lang: 'pt_br',
        },
      });

      return {
        temperature: Math.round(response.data.main.temp),
        condition: response.data.weather[0].main,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        feelsLike: Math.round(response.data.main.feels_like),
        icon: response.data.weather[0].icon,
        location: response.data.name,
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw new Error('Não foi possível obter dados do clima');
    }
  },

  /**
   * Get weather forecast for trip planning
   */
  async getWeatherForecast(
    latitude: number,
    longitude: number,
    days: number = 5
  ): Promise<WeatherData[]> {
    try {
      const response = await axios.get(`${WEATHER_API_URL}/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: WEATHER_API_KEY,
          units: 'metric',
          lang: 'pt_br',
          cnt: days * 8, // 8 data points per day (3-hour intervals)
        },
      });

      // Group by day and get average
      const dailyData: WeatherData[] = [];
      const grouped: { [key: string]: any[] } = {};

      response.data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(item);
      });

      Object.values(grouped).forEach((dayData) => {
        const avgTemp = dayData.reduce((sum, d) => sum + d.main.temp, 0) / dayData.length;
        const midDay = dayData[Math.floor(dayData.length / 2)];

        dailyData.push({
          temperature: Math.round(avgTemp),
          condition: midDay.weather[0].main,
          description: midDay.weather[0].description,
          humidity: midDay.main.humidity,
          windSpeed: midDay.wind.speed,
          feelsLike: Math.round(midDay.main.feels_like),
          icon: midDay.weather[0].icon,
          location: response.data.city.name,
        });
      });

      return dailyData;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw new Error('Não foi possível obter previsão do tempo');
    }
  },

  /**
   * Get weather recommendation for clothing
   */
  getClothingRecommendation(temperature: number, condition: string): string[] {
    const recommendations: string[] = [];

    // Temperature-based recommendations
    if (temperature < 10) {
      recommendations.push('casaco pesado', 'calça longa', 'botas');
    } else if (temperature < 18) {
      recommendations.push('jaqueta', 'moletom', 'calça');
    } else if (temperature < 25) {
      recommendations.push('camisa', 'calça ou shorts', 'tênis');
    } else {
      recommendations.push('camiseta', 'shorts', 'tênis leve ou sandália');
    }

    // Condition-based recommendations
    if (condition.toLowerCase().includes('rain')) {
      recommendations.push('jaqueta impermeável', 'botas');
    } else if (condition.toLowerCase().includes('snow')) {
      recommendations.push('casaco pesado', 'botas de neve', 'luvas');
    } else if (condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear')) {
      recommendations.push('óculos de sol', 'boné');
    }

    return recommendations;
  },
};
