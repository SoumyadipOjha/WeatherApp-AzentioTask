import astronomyChart from "../../assets/astronomyChart.svg";
import { WiBarometer } from "react-icons/wi";
import { useEffect, useState } from "react";
import AstroCard from "./AstroCard";
import DailyWeather from "./DailyWeather";

function Astronomy({ location, time, city, wind, dailyWeather }) {
  const [astro, setAstro] = useState(["--", "--", "--", "--"]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch Astronomy Data
  useEffect(() => {
    async function getAstronomy() {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/astronomy.json?key=743698db963a4478a4b73640220405&q=${city}&dt=${time}`
        );
        if (!response.ok) throw new Error("Failed to fetch astronomy data");

        const data = await response.json();
        if (data.astronomy && data.astronomy.astro) {
          setAstro([
            data.astronomy.astro.sunrise || "--",
            data.astronomy.astro.sunset || "--",
            data.astronomy.astro.moonrise || "--",
            data.astronomy.astro.moonset || "--",
          ]);
        }
      } catch (error) {
        console.error(error);
        setAstro(["--", "--", "--", "--"]);
      }
    }

    getAstronomy();
  }, [city, time]);

  return (
    <div className="flex flex-col items-center lg:justify-between">
      {/* Location & Current Time */}
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-gray-900 dark:text-gray-200">{location}</h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">{currentTime}</span>
      </div>

      {/* AstroCard for Moon & Wind Data */}
      {wind && <AstroCard moonRise={astro[2]} moonSet={astro[3]} wind={wind} />}

      {/* Weather Forecast Section */}
      <div className="w-full">
      <h2 className="font-bold text-center my-6 mt-10 text-gray-900 dark:text-gray-200">
  Weather Forecast
</h2>

        {dailyWeather.slice(0, 5).map((weather, index) => (
          <DailyWeather
            temp={weather.temp}
            key={index}
            icon={weather.icon}
            date={weather.date}
            state={weather.state}
          />
        ))}
      </div>
    </div>
  );
}

export default Astronomy;
