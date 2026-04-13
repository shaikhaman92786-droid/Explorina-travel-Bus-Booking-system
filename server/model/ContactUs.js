const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },

  Email: {
    type: String,
    required: true,
    trim: true
  },

  Message: {
    type: String,
    required: true,
    trim: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("ContactUs", contactUsSchema);