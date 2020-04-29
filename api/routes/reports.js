const express = require("express");
const router = express.Router();

const { Asset } = require("../models/assets");
const auth = require("../middleware/auth");

router.get("/all", auth, async (req, res) => {
  try {
    const data = await Asset.aggregate([
      { $match: {} },
      { $group: { _id: "$category", value: { $sum: 1 } } },
      { $project: { _id: 0, id: "$_id", label: "$_id", value: 1 } },
      { $sort: { total: -1 } },
    ]);

    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Unable to fetch assets" });
  }
});

router.get("/verifiedStatus", auth, async (req, res) => {
  try {
    const data = await Asset.aggregate([
      { $match: {} },
      { $group: { _id: "$verifiedStatus", value: { $sum: 1 } } },
      { $project: { _id: 0, id: "$_id", label: "$_id", value: 1 } },
      { $sort: { total: -1 } },
    ]);
    data.map((obj) => {
      obj.label = obj.label ? "Verified" : "Not Verified";
      obj.id = obj.id ? "Verified" : "Not Verified";
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Unable to fetch assets" });
  }
});

router.get("/location", auth, async (req, res) => {
  try {
    const data = await Asset.aggregate([
      { $match: {} },
      { $group: { _id: "$location", value: { $sum: 1 } } },
      { $project: { _id: 0, id: "$_id", label: "$_id", value: 1 } },
      { $sort: { total: -1 } },
    ]);
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Unable to fetch assets" });
  }
});

router.get("/auditorRemarksOnly", auth, async (req, res) => {
  try {
    const data = await Asset.find(
      {
        $or: [
          { remarkAuditor_1: { $ne: null } },
          { remarkAuditor_2: { $ne: null } },
          { remarkAuditor_3: { $ne: null } },
        ],
      },
      { _id: 1 }
    );
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

router.get("/juniorRemarksOnly", auth, async (req, res) => {
  try {
    const data = await Asset.find(
      {
        $or: [
          { remarkJunior_1: { $ne: null } },
          { remarkJunior_2: { $ne: null } },
          { remarkJunior_3: { $ne: null } },
        ],
      },
      { _id: 1 }
    );
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

module.exports = router;
