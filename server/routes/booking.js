const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const {
  getUserBookings,
  cancelBooking,
  bookEvent,
  getUserBookingsByEvent,
} = require("../controllers/booking");
// Register
router.get("/bookings", verifyToken, getUserBookings);
router.post("/book", verifyToken, bookEvent);
router.post("/cancel", verifyToken, cancelBooking);
router.get("/bookings/:eventId", verifyToken, getUserBookingsByEvent);
module.exports = router;
