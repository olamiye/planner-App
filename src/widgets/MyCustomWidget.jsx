import React, { useEffect, useState } from 'react';

export default function MyCustomWidget() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '5b3ec13807fe4fd653da50acce3d4051';
        const city = 'New York';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setWeatherData({
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          location: data.name,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="my-custom-widget">
      {weatherData ? (
        <>
          <div className="weather-info">
            <img
              className="weather-icon"
              src={weatherData.icon}
              alt={weatherData.description}
            />
            <div className="temperature">{weatherData.temperature}°C</div>
            <div className="description">{weatherData.description}</div>
          </div>
          <div className="location">{weatherData.location}</div>
        </>
      ) : (
        <div className="loading">Loading weather data...</div>
      )}
    </div>
  );
}
