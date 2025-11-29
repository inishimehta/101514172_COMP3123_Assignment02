// Load local .env in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const employeeRoutes = require("./routes/employee.routes");

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://nishi:nishi27@cluster0.pddryou.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

app.route("/").get((req, res) => {
  res.send("<h1>COMP3123 Assignment API</h1>");
});

mongoose.connect(DB_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected");
    // Don't run app.listen if on a serverless platform like Vercel
    if (!process.env.VERCEL) {
      app.listen(SERVER_PORT, () => {
        console.log(`Server running at http://localhost:${SERVER_PORT}/`);
      });
    }
  })
  .catch(err => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });

module.exports = app;
