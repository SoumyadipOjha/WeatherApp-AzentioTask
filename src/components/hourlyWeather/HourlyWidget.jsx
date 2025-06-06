import React from "react";

function HourlyWidget({ temp, time, icon }) {
  return (
    <div className="flex flex-col w-24 h-24 rounded-lg justify-center items-center flex-shrink-0 shadow-md bg-white dark:bg-gray-800 p-2">
      <img src={icon} alt="weathericon" className=" w-[30px] h-[30px]" />

      <span className="text-sm font-bold my-[2px] dark:text-gray-200">{temp} &#8451;</span>
      <span className="text-sm text-gray-600 dark:text-gray-400">{time}</span>
    </div>
  );
}

export default HourlyWidget;
