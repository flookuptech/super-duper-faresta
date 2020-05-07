const express = require("express");
const router = express.Router();

// Local imports
const auth = require("../middleware/auth");
const { Asset, validateAssetData, singleAsset } = require("../models/assets");

router.post("/createNew", auth, async (req, res) => {
  let data = req.body;
  data.assetCreatedBy = req.user.name;

  const { error } = singleAsset(data);
  console.log(error.details);
  if (error) {
    return res.status(500).send({
      err: `Field: ${error.details[0].path}. Msg: ${error.details[0].message}`,
    });
  }

  try {
    const asset = await Asset.create(data);
    res.send({ msg: "Asset added" });
  } catch (error) {
    res.status(500).send({
      err: "Failed to a add asset",
    });
  }
});

// Routes to save assets list recieved from the client
router.post("/", auth, async (req, res) => {
  // Function call to filter and clean the data
  let array = req.body;

  array.forEach((element) => {
    element.assetCreatedBy = req.user.name;
  });

  const { error } = validateAssetData(array);
  if (error) {
    return res.status(400).json({
      msg: "Error in file. View logs below",
      err: error.details,
    });
  }

  try {
    await Asset.insertMany(array);
    res.send({ res: "Asset list added" });
  } catch (error) {
    res.status(500).send({ msg: error.message, err: "Failed to save file!" });
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
    res.send({ msg: "Asset Updated" });
  } catch (error) {
    res.status(500).send({ err: "Asset update failed" });
  }
});

module.exports = router;

// return res.status(500).send({
//   err: `Row: ${error.details[0].path[0] + 1} Column: ${
//     error.details[0].path[1]
//   }. Error: ${error.details[0].context.label}`,
// });
