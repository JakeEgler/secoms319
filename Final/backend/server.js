const axios = require("axios");
require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const API_KEY = "f6b4ba75bf114a724b7b1d7d9525cd6f";

//SET YOUR CITY HERE!!!!
const city = "Ames";
//SET YOUR STATE HERE!!!! use an ISO 3166-2 codes
const state = "US-IA";
//coords
let lat;
let lon;
fetchCoords;

//Data fetching
//--------------------------------------------------------------------------------------------------------------------------------------
async function fetchCoords() {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&limit=${5}&appid=${API_KEY}`;
  const geoResponse = await axios.get(geoUrl);
  const geoData = await geoResponse.json();
  lat = geoData[0].lat;
  lon = geoData[0].lon;
}

async function fetchWeather() {
  const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const weatherResponse = await axios.get(weatherUrl);
  const weatherData = await weatherResponse.json();
  return weatherData;
}
//--------------------------------------------------------------------------------------------------------------------------------------

//Request section
//--------------------------------------------------------------------------------------------------------------------------------------
app.get("/weather", async (req, res) => {
  try {
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error responding" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//--------------------------------------------------------------------------------------------------------------------------------------

//SQL section
//--------------------------------------------------------------------------------------------------------------------------------------
const mysql = require("mysql");
const moment = require("moment");

const connection = mysql.createConnection({
  host: "localhost",
  user: "weatherBot",
  password: "some_pass",
  database: "weatherHistory",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: " + error.stack);
    return;
  }

  console.log("Connected to the database.");
});

connection.query(
  `
  CREATE TABLE IF NOT EXISTS weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude DECIMAL(10,6),
    longitude DECIMAL(10,6),
    timezone VARCHAR(255),
    current_time TIMESTAMP,
    current_temp FLOAT,
    current_feels_like FLOAT,
    current_pressure INT,
    current_humidity INT,
    current_dew_point DECIMAL(10,6),
    current_uvi FLOAT,
    current_clouds INT,
    current_visibility INT,
    current_wind_speed FLOAT,
    current_wind_deg INT,
    current_wind_gust FLOAT,
    current_weather_main VARCHAR(255),
    current_weather_description VARCHAR(255),
    current_weather_icon VARCHAR(255)
    );
`,
  (error, results) => {
    if (error) {
      console.error("Error creating the table: " + error.stack);
      return;
    }

    console.log("Table created.");
  }
);

function insertSQL(data) {
  const current = data.current;
  const current_time = moment.unix(current.dt).format("YYYY-MM-DD HH:mm:ss");

  const current_weather = current.weather[0];

  const query = `
  INSERT INTO weather_data (
    latitude,
    longitude,
    timezone,
    current_time,
    current_temp,
    current_feels_like,
    current_pressure,
    current_humidity,
    current_dew_point,
    current_uvi,
    current_clouds,
    current_visibility,
    current_wind_speed,
    current_wind_deg,
    current_wind_gust,
    current_weather_main,
    current_weather_description,
    current_weather_icon
  ) VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
  )
`;

  const values = [
    data.lat,
    data.lon,
    data.timezone,
    current_time,
    current.temp,
    current.feels_like,
    current.pressure,
    current.humidity,
    current.dew_point,
    current.uvi,
    current.clouds,
    current.visibility,
    current.wind_speed,
    current.wind_deg,
    current.wind_gust,
    current_weather.main,
    current_weather.description,
    current_weather.icon,
  ];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error inserting data into the table: " + error.stack);
      return;
    }

    console.log("Data inserted into the table.");
  });
}

//setInterval(insertSQL(fetchWeather), 60 * 60 * 1000);
//--------------------------------------------------------------------------------------------------------------------------------------
