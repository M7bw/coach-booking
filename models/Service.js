/*const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Service", serviceSchema);*/

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
  },

  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

  }
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
