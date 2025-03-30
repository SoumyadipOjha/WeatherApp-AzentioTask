import { FiRefreshCw } from "react-icons/fi";

const RefreshButton = ({ onRefresh }) => {
  return (
    <button
      onClick={onRefresh}
      className="bg-white dark:bg-gray-700 text-gray-700 dark:text-white p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
    >
      <FiRefreshCw size={18} />
    </button>
  );
};

export default RefreshButton;
