/*const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: {
    type: String,
    enum: ["user", "provider"]
  }
});

module.exports = mongoose.model("User", userSchema);*/
 const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email"
    }
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.length >= 6,
      message: "Password must be at least 6 characters"
    }
  },

  role: {
    type: String,
    enum: ["user", "provider"],
    default: "user"
  }
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);


