const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  gender: {
    type: String,
    enum: ["male", "female"],
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ["admin", "user"]
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);