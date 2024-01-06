const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const petRoutes = require("./routes/pet_routes");
const cors = require("cors");
const { init } = require("./socketConfig"); // Import the socket configuration

require("dotenv").config();

const app = express();
const server = http.createServer(app);

init(server); // Initialize Socket.IO with the server

app.use(express.json());
app.use(cors());

// route
app.get("/api", (req, res) => {
  res.status(201).json({ message: "Connected to Backend!" });
});

// use pet routes
app.use("/api/pets", petRoutes);

// connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`App is Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
