const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema({
  
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // User Snapshot Info
  userName: {
    type: String,
    required: true
  },

  // Bus Reference
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: true
  },

  // Bus Snapshot Info
  busName: {
    type: String,
    required: true
  },

  // Booking Reference
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  },

  // Seats paid for
  selectedSeats: {
    type: [String],
    required: true
  },

  razorpayPaymentId: {
    type: String,
    required: true
  },

  razorpayOrderId: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["success", "failed", "pending"],
    default: "success"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("PaymentHistory", paymentHistorySchema);