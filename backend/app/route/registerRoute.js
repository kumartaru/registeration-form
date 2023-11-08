const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const FormData = require('../models/formData');

// Validation middleware
const validateRegistration = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

// POST route for registration
router.post('/', [
  check('first_name').not().isEmpty(),
  check('last_name').not().isEmpty(),
  check('email').isEmail(),
  check('age').isInt(),
  check('country').not().isEmpty(),
  check('state').not().isEmpty(),
  check('city').not().isEmpty(),
  check('dob').not().isEmpty(),
  check('gender').not().isEmpty(),
], validateRegistration, async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.json({ message: 'Registration successful',data:formData });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Registration failed' });
  }
});

// GET route to retrieve registration data
router.get('/', async (req, res) => {
  try {
    const data = await FormData.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve data' });
  }
});

module.exports = router;
