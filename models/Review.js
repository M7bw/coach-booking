/*const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comment: String
});

module.exports = mongoose.model("Review", reviewSchema);*/
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",

    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    comment: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 300
    }
  },
  { timestamps: true }
);

/*
  Prevent the same user from reviewing
  the same service more than once
*/
reviewSchema.index(
  { serviceId: 1, userId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Review", reviewSchema);
