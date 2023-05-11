//Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------
const axios = require("axios");
require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

var CronJob = require("cron").CronJob;

const mysql = require("mysql");
//--------------------------------------------------------------------------------------------------------------------------------------

//CONFIGURE HERE
//--------------------------------------------------------------------------------------------------------------------------------------

//API KEY
const API_KEY = "f6b4ba75bf114a724b7b1d7d9525cd6f";

//SET YOUR ZIP CODE HERE!!!!
const zip = "50014";
//SET YOUR COUNTRY HERE!!!! use an ISO 3166-2 codes
const country = "US";

//SET DATABASE INFO HERE
const DBhost = "localhost";
const DBuser = "weatherBot";
const DBpassword = "some_pass";
const DBdatabase = "weatherHistory";
//--------------------------------------------------------------------------------------------------------------------------------------

//Data fetching
//--------------------------------------------------------------------------------------------------------------------------------------
//coords
//console.log(fetchCoords());
let coords = { lat: 0, lon: 0 };
fetchCoords();

//This method makes the api call to openweathermap.org to get the coordinates
async function fetchCoords() {
  console.log("Getting coordinates now");
  const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${API_KEY}`;
  const geoResponse = await axios.get(geoUrl);
  const geoData = geoResponse.data;
  coords.lat = geoData.lat;
  coords.lon = geoData.lon;
  console.log("Location");
  console.log("Zip code: " + zip);
  console.log("Country: " + country);
  console.log("Coordinates: " + coords.lat, coords.lon);
}

//This method makes the api call to openweathermap.org to get the weather data
async function fetchWeather() {
  console.log("Getting weather now");
  const weatherUrl = `http://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely&appid=${API_KEY}`;
  const weatherResponse = await axios.get(weatherUrl);
  const weatherData = weatherResponse.data;
  //console.log(weatherData);
  return weatherData;
}
//--------------------------------------------------------------------------------------------------------------------------------------

//Request section
//--------------------------------------------------------------------------------------------------------------------------------------
// This method replies to HTTP get requests with the weather data and forecast.
app.get("/weather", async (req, res) => {
  let weatherData = await fetchWeather();
  try {
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ error: "Error responding" });
  }
});

// This method replies to HTTP get requests with the historical weather data.
app.get("/history/", async (req, res) => {
  weatherHistoryData = await getSQLData();
  try {
    console.log(weatherHistoryData);
    res.json(weatherHistoryData);
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ error: "Error responding" });
  }
});
//--------------------------------------------------------------------------------------------------------------------------------------

//SQL section
//--------------------------------------------------------------------------------------------------------------------------------------

// This is the database connection
const connection = mysql.createConnection({
  host: DBhost,
  user: DBuser,
  password: DBpassword,
  database: DBdatabase,
});

// This is the database connection error reporting
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: " + error.stack);
    return;
  }

  console.log("Connected to the database.");
});

//This is the SQL query to make the table if it isn't there
connection.query(
  `
  CREATE TABLE IF NOT EXISTS weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude DECIMAL(10,6),
    longitude DECIMAL(10,6),
    timezone VARCHAR(255),
    weather_call_time INT,
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

// This function will insert the current weather data into a SQL server.
async function insertSQL() {
  let data = await fetchWeather();
  const current = data.current;

  const current_weather = current.weather[0];

  //This is the SQL query to insert weather data
  const query = `
  INSERT INTO weather_data (
    latitude,
    longitude,
    timezone,
    weather_call_time,
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
    current.dt,
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

async function getSQLData() {
  // This is the SQL query to get the last 72 entries from the weather_data table
  console.log("Retrieving data from the DB");
  const query = `
    SELECT *
    FROM weather_data
    ORDER BY weather_call_time DESC
    LIMIT 72;
  `;

  return new Promise((resolve, reject) => {
    try {
      // Execute the query and wait for the results
      connection.query(query, function (err, result) {
        if (err) {
          console.error("Error retrieving SQL data: " + err.stack);
          reject(err);
        } else {
          console.log("Successfully retrieved data");
          //Makes it an array of objects
          var normalResults = result.map((mysqlObj, index) => {
            return Object.assign({}, mysqlObj);
          });
          resolve(normalResults);
        }
      });
    } catch (error) {
      console.error("Error retrieving SQL data: " + error.stack);
      reject(error);
    }
  });
}

//This runs the insertSQL method every hour
var SQLjob = new CronJob("0 0 */1 * * *", function () {
  console.log("Running sql job");
  insertSQL();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

SQLjob.start();
//--------------------------------------------------------------------------------------------------------------------------------------

//console.log(getSQLData());
