const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

// Allow the React frontend (or any client) to call this API
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/coach-booking";

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
app.use("/users", require("./routes/userRoutes"));
app.use("/services", require("./routes/serviceRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/reviews", require("./routes/reviewRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
