const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

const userRoleRoutes = require("./routes/user-role");
const userRoutes = require("./routes/user");

app.use("/user-roles", userRoleRoutes);
app.use("/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found!" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const server = app.listen(process.env.PORT || 8080, () =>
      console.log("Listening on port ", process.env.PORT || 8080)
    );
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
