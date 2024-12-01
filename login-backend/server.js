const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

const userPath = './users.json';
const workoutPath = './workouts.json';

// Ensure the users.json and workouts.json files exist
if (!fs.existsSync(userPath)) {
  fs.writeFileSync(userPath, JSON.stringify([], null, 2)); // Create an empty array if it doesn't exist
}

if (!fs.existsSync(workoutPath)) {
  const initialWorkouts = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };
  fs.writeFileSync(workoutPath, JSON.stringify(initialWorkouts, null, 2));
}

// Load and save helpers
const loadUsers = () => JSON.parse(fs.readFileSync(userPath));
const saveUsers = (users) => fs.writeFileSync(userPath, JSON.stringify(users, null, 2));

const loadWorkouts = () => JSON.parse(fs.readFileSync(workoutPath));
const saveWorkouts = (workouts) => fs.writeFileSync(workoutPath, JSON.stringify(workouts, null, 2));
app.post("/api/personal-workout", (req, res) => {
  const { day, exercise, sets } = req.body;

  // Validate input data
  if (!day || !exercise || !sets) {
    return res.status(400).json({ success: false, message: "Missing fields: day, exercise, or sets" });
  }

  const workouts = loadWorkouts();
  const newWorkoutId = Date.now(); // Generate a new ID for the personal workout
  const newWorkout = { id: newWorkoutId, exercise, sets, completed: false };

  if (!workouts[day]) {
    workouts[day] = []; // If the day doesn't exist, create a new array for it
  }

  workouts[day].push(newWorkout);
  saveWorkouts(workouts);

  res.json({ success: true, workout: newWorkout });
});

// Routes: Login and Signup
app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body;
  const users = loadUsers(); // Load users
  const user = users.find(user => 
    (user.identifier === identifier || user.phone === identifier) && 
    bcrypt.compareSync(password, user.password)
  );

  if (user) {
    return res.json({ success: true, user });
  } else {
    return res.json({ success: false, message: "Invalid credentials" });
  }
});

app.post('/api/signup', (req, res) => {
  const { name, identifier, phone, password } = req.body;
  const users = loadUsers(); // Load users

  // Check if the user already exists
  if (users.find(user => user.identifier === identifier || user.phone === phone)) {
    return res.json({ success: false, message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10); // Hash password
  const newUser = { name, identifier, phone, password: hashedPassword };
  users.push(newUser); // Save the new user
  saveUsers(users); // Save users to file

  return res.json({ success: true, user: newUser });
});

// Routes: Workout and Progress
app.get("/api/workout", (req, res) => {
  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const workouts = loadWorkouts();
  const dayWorkouts = workouts[today] || [];
  res.json({ success: true, day: today, workouts: dayWorkouts });
});

app.post("/api/progress", (req, res) => {
  const { day, workoutId, completed } = req.body;
  const workouts = loadWorkouts();

  const dayWorkouts = workouts[day];
  if (!dayWorkouts) return res.json({ success: false, message: "Invalid day" });

  const workout = dayWorkouts.find((w) => w.id === workoutId);
  if (!workout) return res.json({ success: false, message: "Workout not found" });

  workout.completed = completed;
  saveWorkouts(workouts);

  res.json({ success: true, workouts: dayWorkouts });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
