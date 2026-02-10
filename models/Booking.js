/*const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: String,
  status: String
});

module.exports = mongoose.model("Booking", bookingSchema);*/

   const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    bookingDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

/**
 * Prevent double booking
 * Same service cannot be booked twice on the same date
 */
bookingSchema.index(
  { serviceId: 1, bookingDate: 1 },
  { unique: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
