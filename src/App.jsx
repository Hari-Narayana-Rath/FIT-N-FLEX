import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate(); // Use this hook for navigation

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 1 second
    }, 1000);

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      navigate("/login");
    } else {
      setLoggedInUser(user);
    }

    return () => clearTimeout(timer); // Clean up timer
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  const handleCardClick = (path) => {
    navigate(path); // Ensure this function is working correctly
  };

  return (
    <div className="App">
      <video
        src="/videos/sample.mp4"
        loop
        autoPlay
        className="fullscreen-video"
      ></video>
      <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />
      <div className="content">
        {loggedInUser ? (
          <div className="cards-container">
            <div
              className="card card-1"
              onClick={() => handleCardClick("/bmi")}
            >
              <img src="/bmi.png" alt="BMI" className="card-image" />
            </div>
            <div
              className="card card-2"
              onClick={() => handleCardClick("/Calendar")} // Navigate to calendar
            >
              <img src="/neon.jpg" alt="About" className="card-image" />
            </div>
            <div
              className="card card-3"
              onClick={() => handleCardClick("/progress")}
            >
              <img src="/prog.jpg" alt="Progress" className="card-image" />
            </div>
          </div>
        ) : (
          <h1>Please login to continue.</h1>
        )}
      </div>
    </div>
  );
}

export default App;
