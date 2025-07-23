import React from "react";
import { Link } from "react-router-dom";

const Navbar=({ onLogout , toggleDarkMode, darkMode}) => {
return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="flex gap-3">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 rounded bg-gray-800 text-white text-sm"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={onLogout}
          className="px-3 py-1 rounded bg-red-600 text-white text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
