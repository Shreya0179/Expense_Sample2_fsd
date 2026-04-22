const express = require("express");
const router = express.Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🔹 REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("STEP 1: Request received");

    const { name, email, password } = req.body;
    console.log("STEP 2:", name, email);

    let user = await User.findOne({ email });
    console.log("STEP 3: user check done");

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, password });
    console.log("STEP 4: user created");

    await user.save();
    console.log("STEP 5: user saved");

    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;