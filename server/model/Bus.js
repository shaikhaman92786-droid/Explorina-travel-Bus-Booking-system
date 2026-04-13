const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  BusName: {
    type: String,
    required: true
  },
  BusImage: {
    type: String,
    default: ""
  },
  DepartureCity: {
    type: String,
    required: true
  },
  ArrivalCity: {
    type: String,
    required: true
  },
  DateOfTravel: {
    type: Date,
    required: true
  },
  DateOfArrival: {
    type: Date,
    required: true
  },
  DepartureTime: {
    type: String,
    required: true
  },
  ArrivalTime: { 
    type: String, 
    required: true 
  },
  Fare: { 
    type: Number, 
    required: true 
  },
  Category: { 
    type: String, 
    default: "Normal" 
  },
  Rating: { 
    type: Number, 
    default: 0 
  },
  NumRows: { 
    type: Number, 
    required: true 
  },
  NumColumns: { 
    type: Number, 
    required: true 
  },
  // This tracks which seats are taken for this specific bus instance
  BookedSeats: { 
    type: [String], 
    default: [] 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Bus', busSchema);