const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctors');
const Patient = require('../models/patients');

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    const patients = await Patient.find();

    res.render('admin', { doctors, patients });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
