import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Calendar.css";
import { Link } from "react-router-dom";

const Calendar = () => {
  const [workouts, setWorkouts] = useState([]);
  const [day, setDay] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/workout")
      .then((response) => {
        setWorkouts(response.data.workouts);
        setDay(response.data.day);
      })
      .catch((error) => console.error("Error fetching workouts:", error));
  }, []);

  const handleCheckboxChange = (workoutId, completed) => {
    axios
      .post("http://localhost:5000/api/progress", {
        day,
        workoutId,
        completed,
      })
      .then(() => {
        setWorkouts((prevWorkouts) =>
          prevWorkouts.map((workout) =>
            workout.id === workoutId ? { ...workout, completed } : workout
          )
        );
      })
      .catch((error) => console.error("Error updating progress:", error));
  };

  return (
    <div className="calendar">
      <Link to="/" className="logo-link">
        <img src="/logoo.jpeg" alt="Logo" className="logo" />
      </Link>

      <h2>Today's Workouts ({day})</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <label>
              <input
                type="checkbox"
                checked={workout.completed}
                onChange={(e) =>
                  handleCheckboxChange(workout.id, e.target.checked)
                }
              />
              {workout.exercise} - {workout.sets}
            </label>
          </li>
        ))}
      </ul>
      <Link to="/progress" className="progress-link">
        View Progress
      </Link>

      <Link to="/personal" className="add-workout-link">
        Add Your Own Workout
      </Link>
    </div>
  );
};

export default Calendar;
