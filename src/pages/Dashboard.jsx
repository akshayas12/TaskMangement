import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import TaskList from "../components/TaskList";
import { useEffect, useState } from "react";

function Dashboard({setIsAuthenticated }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar
        onLogout={handleLogout}
        toggleDarkMode={() => setDarkMode(prev => !prev)}
        darkMode={darkMode}
      />
      <div className="p-6">
        <TaskList />
      </div>
    </div>
  );
}

export default Dashboard;
