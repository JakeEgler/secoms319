//import React from "react";
//import ReactDOM from "react-dom/client";
//import "./index.css";
//import App from "./App";

//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(
//<React.StrictMode>
//<App />
//</React.StrictMode>
//);


}

import React, { useState, useEffect } from "react";
import axios from "axios";

const weatherURL = "http://localhost:3000/weather";
const historyURL = "http://localhost:3000/history";

async function getWeather() {
  return await axios
    .get(weatherURL)
    .then((data) => console.log(data))
    .catch((err) => console.log(err)).data;
}

async function getHistory() {
  return await axios
    .get(historyURL)
    .then((data) => console.log(data))
    .catch((err) => console.log(err)).data;

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeather()
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather for {weatherData.timezone}</h1>
      <ul>
        <li>Temperature: {weatherData.current.temp}</li>
        <li>Feels like: {weatherData.current.feels_like}</li>
        <li>Pressure: {weatherData.current.pressure}</li>
        <li>Humidity: {weatherData.current.humidity}</li>
        <li>UV index: {weatherData.current.uvi}</li>
      </ul>
    </div>
  );
}

export default WeatherComponent;
