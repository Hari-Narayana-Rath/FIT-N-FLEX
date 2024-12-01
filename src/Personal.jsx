import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Personal.css";

const Personal = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users from JSON Server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age) return;

    const newUser = { name, age, hidden: false };
    try {
      const response = await axios.post("http://localhost:3001/users", newUser);
      setUsers([...users, response.data]);
      setName("");
      setAge("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleCheckboxChange = async (user) => {
    try {
      const updatedUser = { ...user, hidden: true };
      await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
      setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      const deletePromises = users.map((user) =>
        axios.delete(`http://localhost:3001/users/${user.id}`)
      );
      await Promise.all(deletePromises);
      setUsers([]);
    } catch (error) {
      console.error("Error clearing all users:", error);
    }
  };

  return (
    <div className="lion-container">
      <h1 className="elephant-heading">Add Your Own Workout</h1>
      <form onSubmit={handleSubmit} className="giraffe-form">
        <input
          type="text"
          className="zebra-input"
          placeholder="Enter Your Personal Workout"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="kangaroo-input"
          placeholder="Enter sets*reps"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit" className="panda-btn">
          Add
        </button>
      </form>

      <div className="workout-section">
        <h2 className="sub-heading">Workouts For Today</h2>
        <div className="tiger-list">
          {users
            .filter((user) => !user.hidden)
            .map((user) => (
              <div key={user.id} className="koala-item">
                <input
                  type="checkbox"
                  className="bear-checkbox"
                  onChange={() => handleCheckboxChange(user)}
                />
                <span className="koala-text">
                  {user.name} ({user.age} reps)
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteWorkout(user.id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
        {users.length > 0 && (
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>
        )}
        <div>
          <button className="back-button" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Personal;
