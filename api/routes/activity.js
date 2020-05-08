const express = require("express");
const router = express.Router();

const { Activity } = require("../models/activity");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const acitivities = await Activity.find();
    res.send({ msg: "All activities performed", acitivities });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: "Failed to fetch activities!" });
  }
});

module.exports = router;
