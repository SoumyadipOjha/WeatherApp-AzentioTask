import { IoMdSearch } from "react-icons/io";
import { MdMyLocation } from "react-icons/md"; // Import location icon
import ThemeToggle from "./ToggleTheme/ToggleTheme";

function SideBar({ searchValue, error }) {
  const onSubmit = (e) => {
    e.preventDefault();
    searchValue(e.target[0].value);
    e.target[0].value = "";
  };

  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `http://api.weatherapi.com/v1/search.json?key=aa30bbb34d2948bc8be110949232605&q=${latitude},${longitude}`
          )
            .then((resp) => resp.json())
            .then((data) => {
              if (data.length > 0) {
                searchValue(`${data[0].name},${data[0].country}`);
              } else {
                alert("Location not found. Try again!");
              }
            })
            .catch(() => alert("Error fetching location data!"));
        },
        () => alert("Geolocation permission denied! Please allow access.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <header className="flex items-center bg-[#fafafa] dark:bg-gray-900 p-3 rounded-lg">
      <div className="flex-auto sm:flex-1">
        <span className="font-bold text-2xl text-[#5d83ff] dark:text-[#91abff] font-Poppins">
          <a href="/">WEATHER DASHBOARD</a>
        </span>
      </div>
      <div className="w-60 relative sm:w-[11rem] flex-auto">
        <form className="flex" onSubmit={onSubmit}>
          <input
            placeholder="City Name (Specify Country)"
            type="search"
            className="flex-1 text-sm text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-800 w-full py-2 px-7 rounded-lg relative focus:outline-none placeholder:text-xs shadow-sm dark:shadow-md"
          />
          {error && (
            <span className="text-xs text-red-500 dark:text-red-400 absolute top-14 left-0 bg-[#fafafa] dark:bg-gray-800 py-3 px-2 rounded-lg">
              {error}
            </span>
          )}
         <button  className="bg-[#91abff] dark:bg-[#5d83ff] text-white flex items-center justify-center p-2 rounded-full ml-5 mr-10 hover:bg-[#7b9dff] dark:hover:bg-[#4a72ff]"><IoMdSearch className="text-2xl" />
</button>


        </form>

        <IoMdSearch className="absolute left-2 top-[30%] text-slate-500 dark:text-gray-400" />
      </div>

      {/* Fetch current location button */}
      <button
  onClick={fetchCurrentLocationWeather}
  className="bg-[#91abff] dark:bg-[#5d83ff] text-white flex items-center justify-center p-2 rounded-full ml-5 mr-10 hover:bg-[#7b9dff] dark:hover:bg-[#4a72ff]"
>
  <MdMyLocation className="text-xl" />
</button>




      <ThemeToggle />
    </header>
  );
}

export default SideBar;
