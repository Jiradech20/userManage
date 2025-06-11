const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/usersRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:4000",
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
