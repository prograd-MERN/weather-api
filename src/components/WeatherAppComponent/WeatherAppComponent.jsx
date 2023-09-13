import React, { useState, useEffect } from 'react';
import './WeatherAppComponent.css'
import axios from 'axios';
import 'tachyons'
const WeatherAppComponent = () => {
  const [location, setLocation] = useState(null);
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
  const [searchedCityWeather, setSearchedCityWeather] = useState(null);
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = () => {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${'662e2f491a814351b9b54443231309'}&q=${searchCity}`;
    
    axios.get(apiUrl)
      .then(response => {
        setSearchedCityWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${'662e2f491a814351b9b54443231309'}&q=${location.latitude},${location.longitude}`;
      
      axios.get(apiUrl)
      .then(response => {
        setCurrentLocationWeather(response.data);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }
}, [location]);

  return (
    <div className="container f4 ">               
      <h1>Weather App</h1>

      {currentLocationWeather && (
        <div className="  bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-5 ba">
          <h2>Current Location Weather</h2>
          <h3>Location: {currentLocationWeather.location.name}</h3>
          <h4>Temperature: {currentLocationWeather.current.temp_c}°C</h4>
          <h4>Condition: {currentLocationWeather.current.condition.text}</h4>
        </div>
      )}

      <div className="bg-light-blue  br3 pa3 ma2 grow bw2 shadow-5 input-group ba">
        <input 
          className="pa2 input-reset ba bg-transparent  hover-black w-40 br3"
          type="text" 
          placeholder="Enter city" 
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-0 br3 bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-5 ba" onClick={handleSearch}>Search</button>
      </div>

      {searchedCityWeather && (
        <div className="bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-5 ba">
          <h2>Weather in {searchedCityWeather.location.name}</h2>
          <h3>Location: {searchedCityWeather.location.name}</h3>
          <h4>Temperature: {searchedCityWeather.current.temp_c}°C</h4>
          <h4>Condition: {searchedCityWeather.current.condition.text}</h4>
        </div>
      )}
    </div>
  );
}

export default WeatherAppComponent;


