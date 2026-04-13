const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // 🔗 Link with User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // User Snapshot Name
  userName: {
    type: String,
    required: true
  },

  // 🔗 Link with Bus 
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: true
  },

  busDetails: {
    BusName: String,
    DepartureCity: String,
    ArrivalCity: String,
    DepartureTime: String,
    ArrivalTime: String,
    DateOfTravel: Date,
  },

  selectedSeats: { type: [String], required: true },
  totalFare: { type: Number, required: true },

  // Payment Tracking 
  paymentId: String,
  razorpayTransactionId: String,
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  
  bookingStatus: {
    type: String,
    enum: ["processing", "confirmed", "cancelled"],
    default: "processing"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);