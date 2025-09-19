const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");

// get all user bookings
async function getUserBookings(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "bookings",
        populate: { path: "eventId", select: "name date time price" },
      });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ bookings: user.bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// User book an event
async function bookEvent(req, res) {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if user already booked this event
    if (user.bookings.includes(eventId)) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    // decrease available seats
    if (event.availableSeats > 0) {
      event.availableSeats -= 1;
      await event.save();
    } else {
      return res.status(400).json({ message: "No available seats" });
    }

    // add booking record
    const newBooking = new Booking({
      userId: userId,
      eventId: eventId,
      totalPrice: event.price,
      bookingDate: new Date(),
    });
    const savedBooking = await newBooking.save();

    user.bookings.push(savedBooking._id);
    await user.save();

    res.status(200).json({ message: "Event booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function cancelBooking(req, res) {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const bookingId = await Booking.findOne({ userId, eventId });
    if (!bookingId) {
      return res.status(404).json({ message: "Booking not found" });
    }
    // Check if user has booked this event
    if (!user.bookings.includes(bookingId._id)) {
      return res
        .status(400)
        .json({ message: "You have not booked this event" });
    }

    // Remove booking record
    await Booking.findByIdAndDelete(bookingId._id);

    // increase available seats
    event.availableSeats += 1;
    await event.save();

    // Remove event from user's bookings
    user.bookings = user.bookings.filter(
      (booking) => booking.toString() !== eventId
    );

    await user.save();
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getUserBookingsByEvent(req, res) {
  try {
    const { eventId } = req.params;
    const bookings = await Booking.find({ eventId })
      .populate("eventId")
      .populate("userId", "-password");

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this event" });
    }
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getUserBookings,
  bookEvent,
  cancelBooking,
  getUserBookingsByEvent,
};
