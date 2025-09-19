const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    match: [
      /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i,
      "Time must be in hh:mm AM/PM format",
    ],
  },
  eventDateTime: {
    type: Date,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1,
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  organizer: {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9\-\+]{9,15}$/, "Please fill a valid phone number"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook
eventSchema.pre("save", function (next) {
  if (this.isNew) {
    this.availableSeats = this.totalSeats;
  }

  if (this.date && this.time) {
    const [timeStr, modifier] = this.time.split(" ");
    let [hours, minutes] = timeStr.split(":").map(Number);

    if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

    const eventDate = new Date(this.date);
    eventDate.setHours(hours, minutes, 0, 0);

    this.eventDateTime = eventDate;
  }

  this.updatedAt = Date.now();
  next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
