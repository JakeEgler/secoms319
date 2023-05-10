CREATE TABLE IF NOT EXISTS weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude FLOAT,
    longitude FLOAT,
    timezone VARCHAR(255),
    current_time DATETIME,
    current_temp FLOAT,
    current_feels_like FLOAT,
    current_pressure INT,
    current_humidity INT,
    current_dew_point FLOAT,
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