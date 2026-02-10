const express = require("express");
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const router = express.Router();

// ===============================
// GET ALL BOOKINGS
// ===============================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("serviceId")
      .populate("userId", "name email role");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to get bookings" });
  }
});

// ===============================
// GET BOOKINGS BY USER
// ===============================
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("serviceId")
      .populate("userId", "name email role");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user bookings" });
  }
});

// ===============================
// GET BOOKINGS BY SERVICE
// ===============================
router.get("/service/:serviceId", async (req, res) => {
  try {
    const bookings = await Booking.find({ serviceId: req.params.serviceId })
      .populate("serviceId")
      .populate("userId", "name email role");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to get service bookings" });
  }
});


// ===============================
// GET BOOKINGS BY PROVIDER
// Provider dashboard: show bookings for all services owned by provider
// ===============================
router.get("/provider/:providerId", async (req, res) => {
  try {
    const { providerId } = req.params;

    // Find all services for that provider, then get bookings for those services
    const services = await Service.find({ providerId }).select("_id");
    const serviceIds = services.map((s) => s._id);

    // If provider has no services, return empty list
    if (serviceIds.length === 0) {
      return res.status(200).json([]);
    }

    const bookings = await Booking.find({ serviceId: { $in: serviceIds } })
      .populate("serviceId")
      .populate("userId", "name email role");

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to get provider bookings" });
  }
});


// ===============================
// CREATE BOOKING
// ===============================
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    // Duplicate booking (same serviceId + bookingDate) => Mongo code 11000
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "This time is already booked for this service" });
    }
    res.status(400).json({ message: "Failed to create booking" });
  }
});


// ===============================
// UPDATE BOOKING
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking" });
  }
});


// ===============================
// UPDATE BOOKING STATUS
// Provider can confirm / cancel / complete
// ===============================
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "cancelled", "completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("serviceId")
      .populate("userId", "name email role");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking status" });
  }
});


// ===============================
// DELETE BOOKING
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

module.exports = router;
