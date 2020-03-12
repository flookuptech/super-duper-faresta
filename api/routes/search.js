const express = require("express");
const router = express.Router();

// Local imports
const { Asset } = require("../models/assets");

// Routes to search assets
router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: "Unable to search" });
  }
});

module.exports = router;
