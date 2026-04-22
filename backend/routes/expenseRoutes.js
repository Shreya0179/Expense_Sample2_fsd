const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

// ➕ Add Expense (Protected)
router.post("/expense", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    const newExpense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      date
    });

    await newExpense.save();

    res.status(201).json({ msg: "Expense added", expense: newExpense });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📄 Get All Expenses (Protected)
router.get("/expenses", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    res.json(expenses);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;