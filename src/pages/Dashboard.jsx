import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import TaskList from "../components/TaskList";
import { useEffect, useState } from "react";

function Dashboard() {
    const navigate=useNavigate()
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
  const savedTheme = localStorage.getItem("darkMode") === "true";
  setDarkMode(savedTheme);
}, []);

useEffect(() => {
  const root = window.document.documentElement;
  if (darkMode) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("darkMode", darkMode);
}, [darkMode]);

    const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");  
    }
  return (
   <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar onLogout={handleLogout} toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
    <div className="p-6">
      <TaskList />
    </div>
    </div>
  );
}

export default Dashboard;
