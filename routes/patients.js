const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');

// GET all patients
router.get('/', async (req, res) => {
  const patients = await Patient.find();
  res.render('patients', { patients });
});

// POST new patient
router.post('/', async (req, res) => {
  const { name, age, gender, condition } = req.body;
  const newPatient = new Patient({ name, age, gender, condition });
  await newPatient.save();
  res.redirect('/patients');
});

module.exports = router;
