require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes")

// express app

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors())
app.use(express.json());

// routes
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes)

// mongodb
mongoose.set("strictQuery", false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`connected to mongodb and listening server on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err)
  });
