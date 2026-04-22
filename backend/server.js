const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: ["http://localhost:5173"]
}));
// routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);  

const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api", expenseRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});