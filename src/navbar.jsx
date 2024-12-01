import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ loggedInUser, onLogout }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div>
        <img
          src="logoo.jpeg"
          alt="Back to Home"
          className="mainlogo"
          onClick={handleLogoClick}
        />
      </div>
      <div className="navbar-title">FIT-N-FLEX</div>

      <div className="navbar-buttons">
        {loggedInUser ? (
          <>
            <button className="profile-button" onClick={handleProfileClick}>
              Profile
            </button>
            <button className="about-button" onClick={handleAboutClick}>
              About
            </button>
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
