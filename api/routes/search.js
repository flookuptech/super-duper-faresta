const express = require("express");
const router = express.Router();

// Local imports
const { Asset } = require("../models/assets");
const auth = require("../middleware/auth");

// Routes to search assets
router.get("/", auth, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.send({ msg: "Search assets" });

    const results = await Asset.find({
      $or: [
        {
          $text: {
            $search: query,
          },
        },
        {
          asset_code: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });
    res.send(results);
  } catch (error) {
    res.status(500).send({ err: "Unable to search" });
  }
});

module.exports = router;
