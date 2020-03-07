const express = require("express");
const router = express.Router();

const { Asset } = require("../models/assets");

router.get("/", async (req, res) => {
  try {
    const data = await Asset.find().select("-date -identifier -element -__v");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Unable to fetch assets" });
  }
});

router.get("/app/:id", async (req, res) => {
  const assetId = req.params.id;
  try {
    const data = await Asset.find({ _id: assetId }).select(
      "-element -__v -date"
    );
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

router.get("/distinctAssets", async (req, res) => {
  try {
    const data = await Asset.find()
      .select("-__v")
      .distinct("category");

    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

router.get("/assetlist/:category", async (req, res) => {
  const category = req.params.category.replace(/_/g, " ");
  try {
    const data = await Asset.find({ category: category }).select("-__v -date");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

router.get("/assetlist/:category/:id", async (req, res) => {
  const assetId = req.params.id;
  try {
    const data = await Asset.find({ _id: assetId }).select("-__v -date");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

module.exports = router;
