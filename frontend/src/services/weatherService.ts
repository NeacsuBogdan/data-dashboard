import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Accesăm cheia din variabilele de mediu
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherData = async (city: string) => {
  if (!API_KEY) {
    throw new Error('API Key is missing. Check your .env file.');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY, // Utilizăm cheia API
        units: 'metric',
      },
    });
    return response.data; // Returnăm toate datele
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
