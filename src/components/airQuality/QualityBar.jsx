import React from "react";

function QualityBar({ airQuality, percent }) {
  return (
    <div className="w-full flex items-center h-16 px-4 relative shadow-md rounded-lg bg-white dark:bg-gray-800">
      <div className="relative h-1 rounded-full w-full bg-blue-50 dark:bg-gray-700 mt-2">
        <div
          style={{ width: `${percent}%` }}
          className="absolute top-0 left-0 h-1 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#0083B0]"
        ></div>
      </div>
      {/* Labels */}
      <span className="absolute text-[10px] top-2 left-2 text-gray-600 dark:text-gray-300">Excellent</span>
      <span className="absolute text-[10px] top-2 right-1/2 translate-x-1/2 text-gray-600 dark:text-gray-300">
        Moderate
      </span>
      <span className="absolute text-[10px] top-2 right-2 text-gray-600 dark:text-gray-300">Hazardous</span>
    </div>
  );
}

export default QualityBar;
