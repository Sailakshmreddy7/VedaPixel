  const mongoose = require("mongoose");
  const { Schema } = mongoose;

  const bookingSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  // Auto-update updatedAt on save
  bookingSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
  });

  // Auto-update updatedAt on update queries
  bookingSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: Date.now() });
    next();
  });

  const Booking = mongoose.model("Booking", bookingSchema);
  module.exports = Booking;
