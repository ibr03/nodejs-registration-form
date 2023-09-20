const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  state: String, // Reference to the state it belongs to
});

module.exports = mongoose.model('City', citySchema);