// routes/userRoutes.js
const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

/** --------- API ROUTES (for database operations) --------- **/

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/", getUsers);

// Get single user by ID
router.get("/:id", getUser);

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

/** --------- FRONTEND ROUTES (for rendering pages) --------- **/

// Homepage - Slideshow + Doctors
router.get("/home", (req, res) => {
  res.render("home"); // views/home.ejs
});

// Patients Page
router.get("/patients", (req, res) => {
  res.render("patients/index"); // views/patients/index.ejs
});

module.exports = router;
