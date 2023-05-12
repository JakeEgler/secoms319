import React from "react";
import WeatherComponent from "./index";
import getWeather from "./index";
import getHistory from "./index";

function App() {
  return (
    <div>
      <button onClick={getWeather}>Current Weather</button>
      <button onClick={getHistory}>Weather History</button>
      <WeatherComponent />
    </div>
  );
}

export default App;
