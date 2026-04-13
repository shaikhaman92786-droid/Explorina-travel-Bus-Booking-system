const express = require('express');
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  createOrder,
  verifyPayment,
  getUserOrders,
  getAllOrders,
  cancelBooking,
  deleteCancelledBooking
} = require('../controllers/orderController');

// Create Razorpay Order
router.post("/create-order", verifyToken, createOrder);

// Verify Payment
router.post("/verify-payment", verifyToken, verifyPayment);

// ✅ SAME OLD ROUTES (IMPORTANT)
router.get("/order-items", verifyToken, getUserOrders);
router.get("/admin/order-items", verifyToken, isAdmin, getAllOrders);

// Cancel Booking
router.post("/cancel-booking", verifyToken, cancelBooking);

// ✅ SAME OLD DELETE ROUTE
router.delete("/delete-cancel-booking/:id", verifyToken, deleteCancelledBooking);

module.exports = router;