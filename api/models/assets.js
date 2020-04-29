const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const assetSchema = new mongoose.Schema({
  asset_code: { type: String, required: true, unique: true },
  category: { type: String, default: null, required: true },
  sub_category: { type: String, default: null, required: true },
  description: { type: String, default: null },
  element: { type: String, default: null },
  vendor_name: { type: String, default: null },
  quantity: { type: String, default: null },
  location: { type: String, default: null },
  base_amount: { type: String, default: null },
  date_of_installation: {
    type: Date,
  },
  month_of_installation: { type: String, default: null },
  vat: { type: String, default: null },
  taxes_: { type: String, default: null },
  service_tax: { type: String, default: null },
  other_charges: { type: String, default: null },
  invoice_date: { type: String, default: null },
  invoice_number: { type: String, default: null },
  total_invoice_amount: { type: String, default: null },
  amount_capitalised: { type: String, default: null },
  depreciation: { type: String, default: null },
  dep_rate: { type: String, default: null },
  dep_per_day: { type: String, default: null },
  net_block: { type: String, default: null },
  classification: { type: String, default: null },
  purchase_value: { type: String, default: null },
  capitalised_value: { type: String, default: null },
  useful_life_companies_act: { type: String, default: null },
  useful_life_management: { type: String, default: null },
  gross_block: { type: String },
  accumulated_depreciation: { type: String, default: null },
  wdv_opening: { type: String, default: null },
  wdv_closing: { type: String, default: null },
  number_of_days: { type: String, default: null },
  date: { type: Date, default: Date.now },
  imageUri: { type: String, default: null },
  imageUriByAuditor: { type: String, default: null },
  verifiedStatus: { type: Boolean, default: false },
  assetTags: [String],
  remarkJunior_1: { type: String, default: null },
  remarkJunior_2: { type: String, default: null },
  remarkJunior_3: { type: String, default: null },
  remarkAuditor_1: { type: String, default: null },
  remarkAuditor_2: { type: String, default: null },
  remarkAuditor_3: { type: String, default: null },
});

assetSchema.index({
  asset_code: "text",
  description: "text",
});

assetSchema.plugin(uniqueValidator);

function validateAssetData(assetData) {
  const schema = Joi.array().items(
    Joi.object().keys({
      asset_code: Joi.number().required(),
      category: Joi.string().required(),
      sub_category: Joi.string().required(),
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
        .label("Invalid date"),
    })
  );
  return schema.validate(assetData);
}

const Asset = mongoose.model("Asset", assetSchema);

exports.validateAssetData = validateAssetData;
exports.Asset = Asset;
