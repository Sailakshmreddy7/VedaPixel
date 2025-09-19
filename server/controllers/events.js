const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");
const {
  validateEventCreation,
  validateEventUpdate,
  extractEventUpdateFields,
  extractEventCreationFields,
} = require("../validations/event");

// Create a new event
async function createEvent(req, res) {
  const { errors, isValid } = validateEventCreation(req.body);
  if (!isValid) return res.status(400).json({ errors });

  try {
    const eventData = extractEventCreationFields(req.body);
    const newEvent = new Event(eventData);
    await newEvent.save();
    res.status(201).json({ event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Update an existing event
async function updateEvent(req, res) {
  const { errors, isValid } = validateEventUpdate(req.body);
  if (!isValid) return res.status(400).json({ errors });

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const updateData = extractEventUpdateFields(req.body);
    Object.assign(event, updateData);

    await event.save();
    res.status(200).json({ event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Delete an event
async function deleteEvent(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // delete the event
    await Event.findByIdAndDelete({ _id: event._id });

    // remove all bookings associated with this event
    await Booking.deleteMany({ eventId: event._id });

    // remove all references in users' bookings array
    await User.updateMany(
      { bookings: { $in: event._id } },
      { $pull: { bookings: event._id } }
    );

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all future events
async function getFutureEvents(req, res) {
  try {
    const now = new Date();
    const events = await Event.find({ eventDateTime: { $gte: now } }).sort({
      eventDateTime: 1,
    });

    res.status(200).json({ events });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Get event by ID
async function getEventById(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all events (admin and user view with registration status)
async function getAllEvents(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("bookings");
    const bookedEventIds = user.bookings.map((booking) =>
      booking.eventId.toString()
    );

    const events = await Event.find().sort({ date: 1, time: 1 }); // all events sorted

    // Mark events as registered if the user has booked them
    const eventsWithRegistrationStatus = events.map((event) => ({
      ...event.toObject(),
      registered: bookedEventIds.includes(event._id.toString()),
    }));

    res.status(200).json({ events: eventsWithRegistrationStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getFutureEvents,
  getEventById,
};
