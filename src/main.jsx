import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./login";
import About from "./About";
import Bmi from "./Bmi";
import Profile from "./profile";
import Calendar from "./Calendar";
import Progress from "./Progress"; // Import the Progress component
import Personal from "./Personal"; // Import Personal component

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/personal" element={<Personal />} /> {/* Add this route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
