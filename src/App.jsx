import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
// import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/add-task" element={<AddTask />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/tasks" element={<TaskList/>} />

      </Routes>
    </Router>
  );
}

export default App;
