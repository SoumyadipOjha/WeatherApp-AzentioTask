import Header from "./components/Header";
import WeatherCard from "./components/weatherCard/WeatherCard";
import { useEffect, useState } from "react";
import AirQualityCard from "./components/airQuality/AirQualityCard";
import Forecast from "./components/hourlyWeather/Forecast";
import Astronomy from "./components/astronomy/Astronomy";

function App() {
  const [initial, setInitial] = useState("Delhi,India");
  const [location, setLocation] = useState([]);
  const [weatherDesc, setWeatherDesc] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [error, setError] = useState();
  const [searchHistory, setSearchHistory] = useState([]);

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
    ].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=aa30bbb34d2948bc8be110949232605&q=${initial}&days=7&aqi=yes&alerts=no`
    )
      .then((resp) => {
        if (!resp.ok) throw new Error();
        else if (resp.ok === true) setError("");
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setLocation([data.location.name, data.location.country]);
        setWeatherDesc([
          data.current.condition.text,
          data.current.temp_c,
          data.current.feelslike_c,
          data.current.humidity,
          data.current.pressure_mb,
          data.current.last_updated,
          data.current.condition.icon,
          data.current.air_quality.pm2_5,
          [data.current.wind_kph, data.current.wind_degree, data.current.wind_dir],
        ]);
        setHourly(
          data.forecast.forecastday[0].hour.map((weather) => ({
            temp: weather.temp_c,
            day: weather.condition.text,
            time: weather.time.slice(10),
            icon: weather.condition.icon,
          }))
        );
        setDaily(
          data.forecast.forecastday.map((weather) => ({
            temp: weather.day.avgtemp_c,
            icon: weather.day.condition.icon,
            date: weather.date,
            state: weather.day.condition.text,
          }))
        );
      })
      .catch((err) => {
        console.error(err);
        setError("No matching location found. Please, check if spelling is correct!");
      });
  }, [initial]);

  return (
// {/* <div className="w-full h-full bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-300"> */}
  
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
    // </div>
  );
}

export default App;
