import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve logged-in user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the home page (App.jsx)
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile-container">
      {/* Profile details inside the card */}
      <div className="profile-card">
        {/* Clickable logo inside the container */}
        <div className="logo-container" onClick={handleLogoClick}>
          <img src="/logoo.jpeg" alt="Back to Home" className="logo-image" />
        </div>

        <h1 className="profile-name">Welcome...{user.name}</h1>
        <p className="profile-email">Email: {user.identifier}</p>
        <p className="profile-phone">Phone: {user.phone}</p>
      </div>
    </div>
  );
};

export default Profile;
