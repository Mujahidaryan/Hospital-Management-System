const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctors');

// GET all doctors
router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.render('doctors', { doctors });
});

// POST to add doctor
router.post('/', async (req, res) => {
  const { name, specialty, experience, image } = req.body;
  const newDoctor = new Doctor({ name, specialty, experience, image });
  await newDoctor.save();
  res.redirect('/doctors');
});

module.exports = router;
