const express = require("express");
const SyllabusService = require("../services/syllabusService");
const router = express.Router();
const { authenticateToken } = require("../services/userService");

router.post("/", authenticateToken, async (req, res) => {
  const result = await new SyllabusService().create(req);
  res.status(result.status).json(result.message);
});

router.get("/", authenticateToken, async (req, res) => {
  const result = await new SyllabusService().getAll(req);
  res.status(result.status).json(result.message);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const result = await new SyllabusService().update(req);
  res.status(result.status).json(result.message);
});

router.get("/:id", async (req, res) => {
  const result = await new SyllabusService().getSyllabusByID(req);
  res.status(result.status).json(result.message);
});

router.get("/:id/generate", async (req, res) => {
  await new SyllabusService().generateSyllabus(req, res);
});

module.exports = router;
