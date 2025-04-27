const express = require("express");
const router = express.Router();
const CourseService = require("../services/courseService");

router.get("/", async (req, res) => {
  const result = await new CourseService().read(req);
  res.status(result.status).json(result.message);
});

router.post("/", async (req, res) => {
  const result = await new CourseService().create(req);
  res.status(result.status).json(result.message);
});

module.exports = router;
