const crypto = require('crypto');
const razorpayInstance = require('../config/razorpay');
const Booking = require("../model/BusBooking");
const Bus = require("../model/Bus");
const PaymentHistory = require("../model/PaymentHistory");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100,
      currency: currency || 'INR',
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);

  } catch (err) {
    res.status(500).json({ message: "Error creating order" });
  }
};

// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      busId,
      selectedSeats,
      totalFare
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      await PaymentHistory.create({
        userId: req.user._id,
        userName: `${req.user.firstName} ${req.user.lastName}`,
        busId,
        busName: bus ? bus.BusName : "Unknown Bus",
        selectedSeats: selectedSeats || [],
        razorpayPaymentId: razorpay_payment_id || "failed",
        razorpayOrderId: razorpay_order_id || "failed",
        amount: totalFare,
        paymentStatus: "failed"
      });

return res.status(400).json({ message: "Invalid signature" });
    }

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const alreadyBooked = bus.BookedSeats.filter(seat =>
      selectedSeats.includes(seat)
    );

    if (alreadyBooked.length > 0) {
      return res.status(400).json({
        message: `Seats already booked: ${alreadyBooked.join(", ")}`
      });
    }

    const newBooking = new Booking({
      userId: req.user._id,
      userName: `${req.user.firstName} ${req.user.lastName}`,
      busId,
      busDetails: {
        BusName: bus.BusName,
        DepartureCity: bus.DepartureCity,
        ArrivalCity: bus.ArrivalCity,
        DepartureTime: bus.DepartureTime,
        ArrivalTime: bus.ArrivalTime,
        DateOfTravel: bus.DateOfTravel
      },
      selectedSeats,
      totalFare,
      paymentId: razorpay_payment_id,
      razorpayTransactionId: razorpay_order_id,
      paymentStatus: "paid",
      bookingStatus: "confirmed"
    });

    await newBooking.save();

    // PaymentHistory is saved.
    const paymentRecord = new PaymentHistory({
      userId: req.user._id,
      userName: `${req.user.firstName} ${req.user.lastName}`,
      busId,
      busName: bus.BusName,
      bookingId: newBooking._id,
      selectedSeats,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      amount: totalFare,
      paymentStatus: "success"
    });
    await paymentRecord.save();

    await Bus.findByIdAndUpdate(busId, {
      $push: { BookedSeats: { $each: selectedSeats } }
    });

    res.status(200).json({ message: "Booking Successful" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Booking.find({ userId: req.user._id });
    res.status(200).json({ orders });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Booking.find()
      .populate("userId", "firstName lastName email");

    res.status(200).json({ orders });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Not found" });

    if (
      req.user.role !== "admin" &&
      booking.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({ message: "Already cancelled" });
    }

    const bus = await Bus.findById(booking.busId);

    bus.BookedSeats = bus.BookedSeats.filter(
      seat => !booking.selectedSeats.includes(seat)
    );

    await bus.save();

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.json({ message: "Cancelled successfully" });

  } catch {
    res.status(500).json({ message: "Error cancelling" });
  }
};

// DELETE CANCELLED BOOKING
exports.deleteCancelledBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) return res.status(404).json({ message: "Not found" });

    if (booking.bookingStatus !== "cancelled") {
      return res.status(400).json({ message: "Only cancelled allowed" });
    }

    await Booking.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });

  } catch {
    res.status(500).json({ message: "Error deleting" });
  }
};