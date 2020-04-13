const express = require("express");
const router = express.Router();

const { Asset } = require("../models/assets");

// Get all assets
router.get("/all", async (req, res) => {
  try {
    const data = await Asset.find().select("-date -identifier -element -__v");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Unable to fetch assets" });
  }
});

// Get all assets for mobile while be removed
router.get("/app/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Asset.find({ _id: id }).select("-element -__v -date");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// Get assets distinctly by category
router.get("/distinctCategory", async (req, res) => {
  try {
    const data = await Asset.find().select("-__v").distinct("category");

    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// Get subcategory distinct assets for a specific category
router.get("/distinctSubCategory/:category", async (req, res) => {
  const category = req.params.category.replace(/_/g, " ");
  try {
    const data = await Asset.find({ category: category })
      .select("-__v")
      .distinct("sub_category");

    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// For getting all assets of a specific category
router.get("/assetlist/:category", async (req, res) => {
  const category = req.params.category.replace(/_/g, " ");
  try {
    const data = await Asset.find({ category: category }).select("-__v -date");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// Get subcategory assets of a specific category
router.get("/assetlist/:category/:subcategory", async (req, res) => {
  const category = req.params.category.replace(/_/g, " ");
  const sub_category = req.params.subcategory.replace(/_/g, " ");
  try {
    const data = await Asset.find({
      category: category,
      sub_category: sub_category,
    }).select("-__v -date");

    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// For getting an asset by _id
router.get("/getAssetById/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Asset.find({ _id: id }).select("-__v -date");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

router.post("/sortAssetsBy", async (req, res) => {
  const filterUsing = JSON.parse(req.query.sortBy);

  if (!filterUsing)
    return res.status(400).send({ err: "Select fields to sort by!" });

  // const filterUsing = { category: "Office Equipments", location: "Delhi" };
  // const queries = [
  //   "sub_category",
  //   "category",
  //   "vendor_name",
  //   "location",
  //   "verifiedStatus",
  // ];
  // const queryString = {};

  // for (const queryType in filterUsing) {
  //   console.log(queryType);
  //   if (queries.includes(queryType)) {
  //     queryString[queryType] = filterUsing[queryType];
  //   }
  // }
  // console.log(queryString);

  try {
    const filteredData = await Asset.find(filterUsing);
    res.send(filteredData);
  } catch (error) {
    res.status(400).send({ err: "Internal Error!" });
  }
});

module.exports = router;
