import React from "react";
import { Link } from "react-router-dom";
import "./about.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Fullscreen background */}
      <img src="/aboutf.jpg" alt="About Background" className="about-background" />

      {/* Container for content */}
      <div className="about-container">
        {/* Clickable logo at the top */}
        <Link to="/">
          <img src="/logoo.jpeg" alt="Logo" className="about-logo" />
        </Link>

        {/* Main content */}
        <div className="about-content">
          <h1 className="about-heading">About Our App</h1>
          <p className="about-description">
            Welcome to FIT-N-CHECK! Our goal is to help you achieve your fitness goals effectively and stay motivated throughout your journey.
          </p>

          <div className="about-cards">
            {/* Card 1 */}
            <div className="about-card">
              <h3 className="about-card-title">BMI Calculator</h3>
              <p className="about-card-text">
                Calculate your Body Mass Index to monitor your health and fitness.
              </p>
            </div>

            {/* Card 2 */}
            <div className="about-card">
              <h3 className="about-card-title">Workout Calendar</h3>
              <p className="about-card-text">
                Plan your workouts and track your daily progress with our interactive calendar.
              </p>
            </div>

            {/* Card 3 */}
            <div className="about-card">
              <h3 className="about-card-title">Progress Tracking</h3>
              <p className="about-card-text">
                Mark your workout days as done and stay consistent with your fitness routine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
