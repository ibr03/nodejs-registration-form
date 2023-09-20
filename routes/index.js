const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Country = require('../models/Country');
const State = require('../models/State'); 
const City = require('../models/City');

// Registration form page
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find();
    res.render('registration', { countries });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to fetch states based on the selected country
router.get('/states', async (req, res) => {
  try {
    const selectedCountry = req.query.country;
    const states = await State.find({ country : selectedCountry });

    const stateOptions = states.map((state) => `<option value="${state.name}">${state.name}</option>`);
    res.send(stateOptions.join(''));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to fetch cities based on the selected state
router.get('/cities', async (req, res) => {
  try {
    const selectedState = req.query.state;
    const cities = await City.find({ state: selectedState });

    const cityOptions = cities.map((city) => `<option value="${city.name}">${city.name}</option>`);
    res.send(cityOptions.join(''));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Save user data
router.post('/register', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();

      res.redirect(`/confirmation?id=${user._id}`);
    } catch (err) {
      console.error(err);
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({ errors });
      }
      return res.status(500).send('Server error');
    }
});

// Confirmation page
router.get('/confirmation', async (req, res) => {
    try {
      const userId = req.query.id; // Retrieve the user ID from the query parameters
      const user = await User.findById(userId); // Find the user by ID

      if (!user) {
        return res.status(404).send('User not found');
      }

      res.render('display', { users: [user] }); // Pass the user data as an array
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
});

module.exports = router;
