import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface WeatherChartProps {
  data: { time: string; temperature: number; humidity: number; windSpeed: number }[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} name="Temperature (°C)" />
      <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
      <Line type="monotone" dataKey="windSpeed" stroke="#ffc658" name="Wind Speed (m/s)" />
    </LineChart>
  );
};

export default WeatherChart;
