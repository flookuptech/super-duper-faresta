const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

// Local imports
const { Asset } = require("../models/assets");
const { manipulateData } = require("../services/filterAssetData");

const schema = Joi.array().items(
  Joi.object().keys({
    asset_code: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string(),
    element: Joi.string(),
    vendor_name: Joi.string(),
    quantity: Joi.number(),
    location: Joi.string(),
    base_amount: Joi.string(),
    month_of_installation: Joi.date()
      .max("now")
      .iso()
      .required()
      .label("Invalid date"),
    vat: Joi.number(),
    taxes_: Joi.string(),
    service_tax: Joi.string(),
    other_charges: Joi.string(),
    invoice_date: Joi.date()
      .max("now")
      .iso()
      .required()
      .label("Invalid date"),
    invoice_number: Joi.number(),
    total_invoice_amount: Joi.string(),
    amount_capitalised: Joi.string(),
    depreciation: Joi.string(),
    dep_rate: Joi.string(),
    dep_per_day: Joi.string(),
    net_block: Joi.string(),
    classification: Joi.string(),
    purchase_value: Joi.string(),
    capitalised_value: Joi.string(),
    useful_life_companies_act: Joi.string(),
    useful_life_management: Joi.string(),
    gross_block: Joi.string(),
    accumulated_depreciation: Joi.string(),
    wdv_opening: Joi.string(),
    wdv_closing: Joi.string(),
    number_of_days: Joi.string(),
    imageUri: Joi.string(),
    imageUriByAuditor: Joi.string(),
    verifiedStatus: Joi.string(),
    remarkJunior_1: Joi.string(),
    remarkJunior_2: Joi.string(),
    remarkJunior_3: Joi.string(),
    remarkAuditor_1: Joi.string(),
    remarkAuditor_2: Joi.string(),
    remarkAuditor_3: Joi.string(),
    date_of_installation: Joi.date()
      .max("now")
      .iso()
      .required()
      .label("Invalid date")
  })
);

// Routes to save assets list recieved from the client
router.post("/", async (req, res) => {
  // Function call to filter and clean the data
  const array = manipulateData(req.body);

  const { error, value } = Joi.validate(array, schema);
  if (error) {
    // console.log(error.details);
    res.status(500).send({
      err: `Row: ${error.details[0].path[0] + 1} Column: ${
        error.details[0].path[1]
      }. Error: ${error.details[0].context.label}`
    });
  } else {
    await Asset.insertMany(array);
    res.send({ res: "Asset list added" });
  }
});

router.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const newAssetData = await Asset.findOneAndUpdate(
      { _id: id },
      {
        $set: newData
      },
      { new: true }
    );
    res.send({ res: "Asset Updated" });
  } catch (error) {
    res.status(500).send({ err: "Asset update failed" });
  }
});

module.exports = router;
