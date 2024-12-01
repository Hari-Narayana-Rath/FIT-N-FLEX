import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Progress.css";

const Progress = () => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/workout")
      .then((response) => {
        const completedWorkouts = response.data.workouts.filter(
          (workout) => workout.completed
        );
        setProgress(completedWorkouts);
      })
      .catch((error) => console.error("Error fetching progress:", error));
  }, []);

  return (
    <div className="progress">
      <h2>Workout Progress</h2>
      {progress.length > 0 ? (
        <ul>
          {progress.map((workout) => (
            <li key={workout.id}>
              {workout.exercise} - {workout.sets}
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed workouts yet. Keep going!</p>
      )}

      {/* Button to go back to the calendar */}
      <button className="back-button" onClick={() => window.history.back()}>
        Go Back
      </button>

      {/* Button to navigate to the Add Your Own Workout page */}
      <Link to="/personal" className="add-workout-link">
        Add Your Own Workout
      </Link>
    </div>
  );
};

export default Progress;
