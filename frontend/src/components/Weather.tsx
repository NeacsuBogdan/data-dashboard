import React, { useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import WeatherChart from './WeatherChart';
import WeatherMap from './WeatherMap'; // Importăm WeatherMap
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import Loader from './Loader'; // Importăm componenta Loader

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>(''); // Numele orașului
  const [weatherData, setWeatherData] = useState<any>(null); // Datele meteo
  const [error, setError] = useState<string | null>(null); // Gestionarea erorilor
  const [loading, setLoading] = useState<boolean>(false); // Stare de încărcare

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err: any) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchData();
    } else {
      setError('Please enter a city name.');
    }
  };

  const prepareChartData = (weather: any) => {
    return weather.list.slice(0, 8).map((entry: any) => ({
      time: new Date(entry.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: entry.main.temp,
      humidity: entry.main.humidity,
      windSpeed: entry.wind.speed,
    }));
  };

  const groupDataByDay = (weather: any) => {
    const days: { [key: string]: any[] } = {};
    weather.list.forEach((entry: any) => {
      const date = new Date(entry.dt_txt).toLocaleDateString();
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(entry);
    });
    return days;
  };

  const dailyData = weatherData ? groupDataByDay(weatherData) : {};

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '1.5rem' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Enter city name"
                variant="outlined"
                value={city}
                onChange={handleInputChange}
                error={!!error}
                helperText={error}
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Get Weather
              </Button>
            </Grid>
          </Grid>
        </form>
        {loading ? (
          <Loader />
        ) : (
          weatherData && weatherData.list && weatherData.city && (
            <>
              <Paper elevation={3} style={{ padding: '1.5rem', marginTop: '2rem' }}>
                <Typography variant="h5" color="primary" gutterBottom>
                  {weatherData.city.name}
                </Typography>
                <Typography variant="body1">
                  Temperature: {weatherData.list[0]?.main?.temp ?? 'N/A'}°C
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {weatherData.list[0]?.weather[0]?.description ?? 'N/A'}
                </Typography>
              </Paper>

              {/* Adăugăm componenta de hartă */}
  <WeatherMap
    latitude={weatherData.city.coord.lat}
    longitude={weatherData.city.coord.lon}
    cityName={weatherData.city.name}
  />

              <Paper elevation={3} style={{ padding: '1.5rem', marginTop: '2rem' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Weather Forecast (Next 24 Hours)
                </Typography>
                <WeatherChart data={prepareChartData(weatherData)} />
              </Paper>

              <Paper elevation={3} style={{ padding: '1.5rem', marginTop: '2rem' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Daily Forecast
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(dailyData).map(([date, entries]) => (
                    <Grid item xs={12} sm={6} md={4} key={date}>
                      <Card>
                        <CardContent>
                          <Typography variant="subtitle1" color="primary">
                            {date}
                          </Typography>
                          <Typography variant="body2">
                            Avg Temp: {Math.round(
                              entries.reduce((sum, e) => sum + e.main.temp, 0) / entries.length
                            )}
                            °C
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Conditions: {entries[0]?.weather[0]?.description ?? 'N/A'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </>
          )
        )}
      </Paper>
    </Container>
  );
};

export default Weather;
