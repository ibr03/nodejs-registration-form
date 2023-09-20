const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: String,
  country: String, // Reference to the country it belongs to
});

module.exports = mongoose.model('State', stateSchema);