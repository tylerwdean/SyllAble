const express = require("express");
const app = express();
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const syllabusRoutes = require("./routes/syllabusRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.static("public/dist"));
app.use(express.json());

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from Vite
    credentials: true, // If using cookies
  })
);

app.get("/api/healthcheck", (req, res) => {
  console.log("Healthcheck request received");
  res.send("Application healthy");
});

app.use("/api/courses", courseRoutes);

app.use("/api/user", userRoutes);

app.use("/api/syllabus", syllabusRoutes);

app.listen(PORT);
