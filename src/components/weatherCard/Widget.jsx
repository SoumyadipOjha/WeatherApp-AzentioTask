import React from "react";

function Widget({ condition, conditionNm }) {
  return (
    <div className="md:w-20 md:h-16 w-24 h-20 shadow-sm rounded-lg bg-[#fafafa] dark:bg-gray-800 text-center flex flex-col justify-center p-2">
      <span className="md:text-xs text-sm text-black dark:text-gray-300">
        {conditionNm}
      </span>
      <span className="md:text-sm text-base font-bold text-[#557cff] dark:text-blue-400">
        {condition}
      </span>
    </div>
  );
}

export default Widget;
