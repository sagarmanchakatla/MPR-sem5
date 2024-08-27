import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import React, { useState, useEffect } from 'react';

import Schedule from "./pages/Schedule";
import Saved from "./pages/Saved";
import "./App.css";
import Room from "./pages/Room";
import Meeting from "./pages/Meeting";
import Signup from "./pages/signup";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/meet" element={<Meeting />} />
        <Route path="/room" element={<Room />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/home" /> : <Signup />}
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/meet"
          element={isAuthenticated ? <Meeting /> : <Navigate to="/login" />}
        />
        <Route
          path="/room"
          element={isAuthenticated ? <Room /> : <Navigate to="/login" />}
        />
        <Route
          path="/schedule"
          element={isAuthenticated ? <Schedule /> : <Navigate to="/login" />}
        />
        <Route
          path="/saved"
          element={isAuthenticated ? <Saved /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;