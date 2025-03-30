function AstroWidget({ state, icon, stateTitle }) {
  return (
    <div className="flex items-center justify-center rounded-lg p-3 shadow-md bg-white dark:bg-gray-800">
      <img src={icon} alt={`${stateTitle} icon`} className="w-[55px] h-[55px]" />
      <div className="flex flex-col ml-2">
        <span className="text-xs font-semibold dark:text-gray-200">{stateTitle}</span>
        <span className="text-xs text-gray-600 dark:text-gray-400">{state}</span>
      </div>
    </div>
  );
}

export default AstroWidget;
