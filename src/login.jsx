import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    phone: "",
    password: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showContainer, setShowContainer] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    const containerTimer = setTimeout(() => {
      setShowMessage(false);
      setShowContainer(true);
    }, 7000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(containerTimer);
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  const handleSubmitSignup = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          identifier: formData.identifier,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        setFormData({ name: "", identifier: "", phone: "", password: "" }); // Reset form data
        navigate("/");
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="login-page">
      <video
        src="/videos/best.mp4"
        loop
        autoPlay
        className="fullscreen-video"
        onCanPlay={() => {
          document.querySelector(".fullscreen-video").play();
        }}
      ></video>

      {showMessage && (
        <h1 className="fade-in-out message">Let’s see, are you fit enough?</h1>
      )}

      {showContainer && (
        <div className="fade-in login-container">
          {showSignup ? (
            <form className="login-form" onSubmit={handleSubmitSignup}>
              <img
                src="logoo.jpeg"
                alt="Back to Home"
                className="back-to-home-image"
                onClick={() => setShowSignup(false)}
              />
              <h2>Sign Up</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="identifier"
                placeholder="Email"
                value={formData.identifier || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone || ""}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password || ""}
                onChange={handleChange}
                required
              />
              <button type="submit">Sign Up</button>
              <p>
                Already have an account?{" "}
                <span
                  className="redirect-link"
                  onClick={() => setShowSignup(false)}
                >
                  Login here
                </span>
              </p>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleSubmitLogin}>
              <img
                src="logoo.jpeg"
                alt="Back to Home"
                className="back-to-home-image"
              />
              <h2>Login</h2>
              <input
                type="text"
                name="identifier"
                placeholder="Email or Phone Number"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Login</button>
              <p>
                Haven't signed up yet?{" "}
                <span
                  className="redirect-link"
                  onClick={() => setShowSignup(true)}
                >
                  Create a new account
                </span>
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
