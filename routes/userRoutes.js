// استدعاء مكتبة express
const express = require("express");

// استدعاء موديل User من مجلد models
const User = require("../models/User");

// إنشاء Router من express
const router = express.Router();

/*
====================================
➕ CREATE USER (POST)
====================================
هذا المسار يستخدم لإنشاء مستخدم جديد
*/
router.post("/", async (req, res) => {
  try {
    // إنشاء مستخدم جديد في قاعدة البيانات
    // البيانات تأتي من req.body
    const user = await User.create(req.body);

    // في حال النجاح نرجع status 201 (تم الإنشاء)
    res.status(201).json(user);
  } catch (error) {
    // في حال فشل إنشاء المستخدم
    res.status(400).json({ message: "User creation failed" });
  }
});

/*
====================================
🔐 LOGIN (POST)
====================================
Simple login WITHOUT JWT (as requested).
It returns the user object if email/password match.
NOTE: Passwords are stored as plain text in this project.
*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

/*
====================================
📥 GET ALL USERS (GET)
====================================
هذا المسار يستخدم لجلب كل المستخدمين
*/
router.get("/", async (req, res) => {
  try {
    // جلب جميع المستخدمين من قاعدة البيانات
    const users = await User.find();

    // في حال النجاح نرجع قائمة المستخدمين
    res.status(200).json(users);
  } catch (error) {
    // في حال وجود مشكلة في السيرفر
    res.status(500).json({ message: "Unable to get users" });
  }
});

/*
====================================
👤 GET USER BY ID (GET)
====================================
*/
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Unable to get user" });
  }
});

// تصدير الراوتر لاستخدامه في app.js
module.exports = router;
