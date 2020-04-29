const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

// Local imports
const auth = require("../middleware/auth");
const { Asset, validateAssetData } = require("../models/assets");
const { manipulateData } = require("../services/filterAssetData");

// Routes to save assets list recieved from the client
router.post("/", auth, async (req, res) => {
  // Function call to filter and clean the data
  const array = manipulateData(req.body);

  const { error } = validateAssetData(array);
  if (error) {
    return res.status(500).send({
      err: `Row: ${error.details[0].path[0] + 1} Column: ${
        error.details[0].path[1]
      }. Error: ${error.details[0].context.label}`,
    });
  }

  try {
    await Asset.insertMany(array);
    res.send({ res: "Asset list added" });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

router.put("/edit/:id", auth, async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const newAssetData = await Asset.findOneAndUpdate(
      { _id: id },
      {
        $set: newData,
      },
      { new: true }
    );
    res.send({ res: "Asset Updated" });
  } catch (error) {
    res.status(500).send({ err: "Asset update failed" });
  }
});

module.exports = router;
