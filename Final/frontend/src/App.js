import React from "react";
import WeatherComponent from "./index";
import getWeather from "./index";
import getHistory from "./index";

function App() {
  return (
    <div class="views">
      <div>
        <button onclick={getWeather} class="view-button">
          Current Weather
        </button>
      </div>
      <div>
        <button onclick={getHistory} class="view-button">
          Weather History
        </button>
      </div>
    </div>

    //<div>
    //<button onClick={getWeather}>Current Weather</button>
    //<button onClick={getHistory}>Weather History</button>
    //<WeatherComponent />
    //</div>
  );
}

export default App;
export { getWeather };
export { getHistory };
