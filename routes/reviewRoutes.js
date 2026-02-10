const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: "Unable to create review" });
  }
});

router.get("/service/:serviceId", async (req, res) => {
  try {
    const reviews = await Review.find({
      serviceId: req.params.serviceId
    }).populate("userId", "name email role");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Unable to getreviews" });
  }
});

module.exports = router;
