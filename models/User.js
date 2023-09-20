const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
      type: String,
      required: true,
      validate: /^[A-Za-z]+$/,
    },
  lastName: {
      type: String,
      required: true,
      validate: /^[A-Za-z]+$/,
    },
  email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
      validate: {
        validator: function (value) {
          // Custom email validation logic
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: 'Invalid email format',
      },
    },
  country: {
      type: String,
      required: true,
      validate: /^[A-Za-z]+$/,
    },
  state: {
      type: String,
      required: true,
    },
  city: {
      type: String,
      required: true,
    },
  gender: {
      type: String,
      required: true
    },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Custom date of birth validation logic
        const ageLimit = new Date();
        ageLimit.setFullYear(ageLimit.getFullYear() - 14); // 14 years old
        return value < ageLimit;
      },
      message: 'Date of birth must be older than 14 years',
    },
  },
});

// Add a virtual field to calculate age
userSchema.virtual('age').get(function () {
  const dob = this.dob;
  if (!dob) return null;

  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
});


module.exports = mongoose.model('User', userSchema);
