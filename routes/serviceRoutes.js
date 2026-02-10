// استدعاء مكتبة express
const express = require("express");

// استدعاء موديل Service من مجلد models
const Service = require("../models/Service");

// إنشاء Router من express
const router = express.Router();

/*
====================================
📥 GET ALL SERVICES (GET)
====================================
*/
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().populate("providerId", "name email role");
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to get services" });
  }
});

/*
====================================
📥 GET SERVICES BY PROVIDER (GET)
====================================
*/
router.get("/provider/:providerId", async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.params.providerId });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to get provider services" });
  }
});

/*
====================================
📄 GET SERVICE BY ID (GET)
====================================
*/
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("providerId", "name email role");
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to get service" });
  }
});

/*
====================================
➕ CREATE SERVICE (POST)
====================================
*/
router.post("/", async (req, res) => {
  try {
    // إنشاء خدمة جديدة
    const service = await Service.create(req.body);

    // نجاح الإنشاء
    res.status(201).json(service);
  } catch (err) {
    // رسالة خطأ بسيطة
    res.status(400).json({ message: "Failed to create service" });
  }
});

/*
====================================
✏️ UPDATE SERVICE (PUT)
====================================
*/
router.put("/:id", async (req, res) => {
  try {
    // تحديث الخدمة
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // الخدمة غير موجودة
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // نجاح التحديث
    res.status(200).json(service);
  } catch (err) {
    // رسالة خطأ بسيطة
    res.status(400).json({ message: "Failed to update service" });
  }
});

/*
====================================
❌ DELETE SERVICE (DELETE)
====================================
*/
router.delete("/:id", async (req, res) => {
  try {
    // حذف الخدمة
    const service = await Service.findByIdAndDelete(req.params.id);

    // الخدمة غير موجودة
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // نجاح الحذف
    res.status(200).json({ message: "Service deleted" });
  } catch (err) {
    // رسالة خطأ بسيطة
    res.status(400).json({ message: "Failed to delete service" });
  }
});

// تصدير الراوتر
module.exports = router;
