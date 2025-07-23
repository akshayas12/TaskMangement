import React from "react";
import { Link } from "react-router-dom";

const Navbar=({ onLogout }) => {
    return (
    <nav className="bg-blue-900 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Management</h1>
      <div className="space-x-4">
        <Link
          to="/add-task"
          className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-blue-500 hover:text-white border border-blue-300 shadow-sm"
        >
          Add Task
        </Link>
      <button onClick={onLogout}     className="bg-blue-900 text-black-800 px-4 py-1 rounded hover:bg-blue-500 border border-blue-300 shadow-sm">
      Logout
      </button>
    </div>
    </nav>
  );
};
export default Navbar;
