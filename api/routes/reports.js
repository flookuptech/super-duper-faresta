const express = require("express");
const router = express.Router();

const { Asset } = require("../models/assets");

router.get("/all", async (req, res) => {
  try {
    const data = await Asset.aggregate([
      { $match: {} },
      { $group: { _id: "$category", value: { $sum: 1 } } },
      { $project: { _id: 0, id: "$_id", label: "$_id", value: 1 } },
      { $sort: { total: -1 } }
    ]);

    res.send(data);
  } catch (error) {
    res.status(500).send("Unable to fetch assets");
  }
});

router.get("/verifiedStatus", async (req, res) => {
  try {
    const data = await Asset.aggregate([
      { $match: {} },
      { $group: { _id: "$verifiedStatus", value: { $sum: 1 } } },
      { $project: { _id: 0, id: "$_id", label: "$_id", value: 1 } },
      { $sort: { total: -1 } }
    ]);
    data.map(obj => {
      obj.label = obj.label ? "Verified" : "Not Verified";
      obj.id = obj.id ? "Verified" : "Not Verified";
    });
    res.send(data);
  } catch (error) {
    res.status(500).send("Unable to fetch assets");
  }
});

module.exports = router;
