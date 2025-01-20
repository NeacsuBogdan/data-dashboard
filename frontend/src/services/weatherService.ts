import axios from 'axios';

const API_KEY = '118c30bcabbb0396ae747d1826f3be37'; // Înlocuiește cu cheia ta API
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data; // Returnăm toate datele
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

