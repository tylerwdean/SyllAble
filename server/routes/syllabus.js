const express = require("express");
const router = express.Router();
const db = require("../db");  // Assuming db is your connection to MariaDB

// Route to get all syllabi
router.get("/syllabi", (req, res) => {
  db.query("SELECT * FROM syllabi", (err, results) => {
    if (err) {
      console.error("Error fetching syllabi: ", err);
      res.status(500).send("Error fetching syllabi");
    } else {
      res.json(results);  // Send the data to the frontend
    }
  });
});

module.exports = router;
