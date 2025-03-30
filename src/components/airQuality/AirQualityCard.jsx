import React from "react";
import QualityBar from "./QualityBar";

function AirQualityCard({ airQuality }) {
  let percentQuality = (airQuality * 100) / 34;
  if (percentQuality > 100) percentQuality = 100;

  function qualityCheck() {
    if (airQuality <= 5) return "Good";
    else if (airQuality <= 34) return "Moderate";
    else return "Hazardous";
  }

  return (
    <div className="bg-[#fafafa] dark:bg-gray-800 dark:text-white sm:my-4 md:w-[19rem] w-full max-w-sm h-auto p-4 flex flex-col justify-between rounded-xl shadow-sm relative">
      {/* Top Section */}
      <div className="flex justify-between items-start flex-wrap gap-2">
        {/* Title */}
        <span className="font-bold text-lg">Air Quality</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 sm:w-full md:w-40 mt-1">
          Air quality is calculated based on the PM2.5 level
        </span>

        {/* Air Quality Value */}
        <div className="flex flex-col text-right text-slate-800 dark:text-white">
          <div>
            <span className="font-bold text-2xl text-[#557cff] dark:text-[#88a4ff]">
              {Math.round(airQuality) + " "}
            </span>
            <span className="text-xs">(PM2.5)</span>
          </div>
          <span className="text-sm">{qualityCheck()}</span>
        </div>
      </div>

      {/* Quality Bar */}
      <QualityBar airQuality={airQuality} percent={Math.round(percentQuality)} />
    </div>
  );
}

export default AirQualityCard;
