import React, { useState } from "react";
import "./bmi.css";

const Bmi = () => {
  const [bmiResult, setBmiResult] = useState("");

  const calculateBmi = () => {
    const height = document.getElementById("height").value / 100;
    const weight = document.getElementById("weight").value;

    if (height > 0 && weight > 0) {
      const bmi = (weight / (height * height)).toFixed(2);
      const result =
        bmi < 18.5
          ? "Underweight"
          : bmi < 24.9
          ? "Normal weight"
          : bmi < 29.9
          ? "Overweight"
          : "Obese";
      setBmiResult(`Your BMI is ${bmi}: ${result}`);
    } else {
      setBmiResult("Please enter valid height and weight!");
    }
  };

  return (
    <div className="bmi-page">
      {/* Fullscreen Background Image */}
      <img
        src="/try.webp"
        alt="BMI Background"
        className="fullscreen-image"
      />

      {/* BMI Calculator Container */}
      <div className="bmi-container">
        <h2 className="bmi-title">BMI Calculator</h2>
        <div className="bmi-inputs">
          <input
            type="number"
            placeholder="Enter your height (in cm)"
            id="height"
          />
          <input
            type="number"
            placeholder="Enter your weight (in kg)"
            id="weight"
          />
        </div>
        <button className="bmi-button" onClick={calculateBmi}>
          Calculate BMI
        </button>
        {bmiResult && <p className="bmi-result">{bmiResult}</p>}
      </div>
    </div>
  );
};

export default Bmi;
