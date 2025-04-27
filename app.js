// app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const { connectDB } = require("./db/connect");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session and Flash Messages
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Set Flash Messages to Locals
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Static Files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const doctorsRouter = require("./routes/doctors");
const patientsRouter = require("./routes/patients");
const adminRouter = require("./routes/admin");
const userRoutes = require("./routes/userRoutes");

app.use("/doctors", doctorsRouter);
app.use("/patients", patientsRouter);
app.use("/admin", adminRouter);
app.use("/api/users", userRoutes);  // Your user routes mounted here

// Default Route
app.get("/", (req, res) => {
  res.redirect("/patients");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
