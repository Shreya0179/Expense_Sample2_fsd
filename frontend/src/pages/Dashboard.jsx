import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const token = localStorage.getItem("token");

  // 🔹 Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        "https://expense-sample2-fsd.onrender.com/api/expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Add expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://expense-sample2-fsd.onrender.com/api/expense",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Expense Added");
      fetchExpenses(); // refresh list
    } catch (err) {
      alert("Error adding expense");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Load expenses on page load
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Add Expense Form */}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="amount" placeholder="Amount" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <button type="submit">Add Expense</button>
      </form>

      <hr />

      {/* Expense List */}
      <h3>Your Expenses:</h3>
      {expenses.map((exp) => (
        <div key={exp._id}>
          <p>
            {exp.title} - ₹{exp.amount} ({exp.category})
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;