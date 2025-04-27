const express = require("express");
const SyllabusService = require("../services/syllabusService");
const router = express.Router();

router.post("/", async (req, res) => {
  const result = await new SyllabusService().create(req);
  res.status(result.status).json(result.message);
});

router.get("/", async (req, res) => {
  const result = await SyllabusService().getAll(req);
  res.status(result.status).json(result.message);
});

router.put("/:id", async (req, res) => {
  const result = await new SyllabusService().update(req);
  res.status(result.status).json(result.message);
});

router.get("/:id", async (req, res) => {
  const result = await new SyllabusService().getSyllabusByID(req);
  res.status(result.status).json(result.message);
});

router.get("/:id/generate", async (req, res) => {
  const result = await new SyllabusService().generateSyllabus(req);
  res.status(result.status).json(result.message);
});

module.exports = router;
