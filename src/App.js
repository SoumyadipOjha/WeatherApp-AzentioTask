import Header from "./components/Header";
import WeatherCard from "./components/weatherCard/WeatherCard";
import { useEffect, useState } from "react";
import AirQualityCard from "./components/airQuality/AirQualityCard";
import Forecast from "./components/hourlyWeather/Forecast";
import Astronomy from "./components/astronomy/Astronomy";

function App() {
  const [initial, setInitial] = useState("Delhi");
  const [location, setLocation] = useState([]);
  const [weatherDesc, setWeatherDesc] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [error, setError] = useState();
  const [searchHistory, setSearchHistory] = useState([]);

  const API_KEY = "6fa1bb35a696e1e25ef20b8a4026fb61"; // Replace with your actual API key

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(savedHistory);
  }, []);

  const searchValue = (value) => {
    const newSearch = value.toLowerCase();
    setInitial(newSearch);

    const updatedHistory = [
      newSearch,
      ...searchHistory.filter((city) => city !== newSearch),
    ].slice(0, 6);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${initial}&appid=${API_KEY}&units=metric`
    )
      .then((resp) => {
        if (!resp.ok) throw new Error();
        else setError("");
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setLocation([data.city.name, data.city.country]);

        setWeatherDesc([
          data.list[0].weather[0].description, // Current weather description
          data.list[0].main.temp, // Temperature
          data.list[0].main.feels_like, // Feels like temperature
          data.list[0].main.humidity, // Humidity
          data.list[0].main.pressure, // Pressure
          data.list[0].dt_txt, // Last updated time
          `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`, // Weather icon
          data.list[0].wind.speed, // Wind Speed
          [data.list[0].wind.deg, data.list[0].wind.speed], // Wind details
        ]);

        setHourly(
          data.list.slice(0, 8).map((weather) => ({
            temp: weather.main.temp,
            day: weather.weather[0].description,
            time: weather.dt_txt.split(" ")[1].slice(0, 5),
            icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
          }))
        );

        setDaily(
          data.list
            .filter((_, index) => index % 8 === 0)
            .map((weather) => ({
              temp: weather.main.temp,
              icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
              date: weather.dt_txt.split(" ")[0],
              state: weather.weather[0].description,
            }))
        );
      })
      .catch((err) => {
        console.error(err);
        setError("No matching location found. Please, check if spelling is correct!");
      });
  }, [initial]);

  return (
    <main className="fixed top-0 left-0 right-0 max-w-full h-screen flex lg:flex-col max-w-[1250px] lg:w-[90%] mx-auto bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-300 z-50">
      {/* Left Column */}
      <section className="ml-[3%] lg:ml-0 w-2/3 lg:w-full">
        <Header searchValue={searchValue} error={error} />
        
        {/* Search History Section */}
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">History</h3>
          <ul className="mt-2">
            {searchHistory.map((city, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-300 text-gray-700 dark:text-gray-300"
                onClick={() => searchValue(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>

        <section className="h-auto flex flex-col mt-8">
          {/* City Name Text */}
          <div className="flex flex-col pb-4">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {location[0]}
            </span>
            <span className="text-base text-gray-600 dark:text-gray-400">{location[1]}</span>
          </div>

          {/* Weather Cards */}
          <div className="flex flex-wrap justify-between sm:justify-center">
            <WeatherCard location={location} weatherDesc={weatherDesc} />
            <AirQualityCard airQuality={weatherDesc[7]} />
          </div>

          <Forecast hourlyWeather={hourly} />
        </section>
      </section>

      {/* Right Sidebar */}
      <section className="w-1/3 lg:w-full ml-4 lg:ml-0 px-6 lg:px-0 mb-10">
        <div className="bg-[#fafafa] dark:bg-gray-900 shadow-sm h-full rounded-2xl p-4 pt-6">
          <Astronomy
            location={location[0]}
            time={weatherDesc[5]}
            city={initial}
            wind={weatherDesc[8]}
            dailyWeather={daily}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
