const express = require("express");
const UserService = require("../services/userService");
const router = express.Router();

router.post("/", async (req, res) => {
  const result = await new UserService().create(req);
  res.status(result.status).json(result.message);
});

router.get("/authenticate", async (req, res) => {
  const result = await new UserService().login(req);
  res.status(result.status).json(result.message);
});

module.exports = router;
