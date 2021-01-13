const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const uniqueValidator = require("mongoose-unique-validator");
const contextService = require("request-context");
const { Activity } = require("./activity");
const { DateTime } = require('luxon');

const assetSchema = new mongoose.Schema({
  asset_code: { type: String, required: true, unique: true },
  category: { type: String, default: "Other", required: true },
  sub_category: { type: String, default: null, required: true },
  description: { type: String, default: null },
  vendor_name: { type: String, default: null },
  quantity: { type: String, default: null },
  location: { type: String, default: null },
  base_amount: { type: String, default: null },
  scrap_value: {type: String, default: null},
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
  useful_life: { type: String, default: null },
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
  assetCreatedBy: { type: String, default: null },
  deleteStatus: { type: Boolean, default: false },
  visibility: { type: Boolean, default: false },
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

assetSchema.index({
  asset_code: "text",
  description: "text",
});

assetSchema.plugin(uniqueValidator);

assetSchema.virtual('depriciations').get(function () {
  const end = DateTime.fromISO('2016-05-31') // Current year
  const start = DateTime.fromISO(this.month_of_installation) // Year of installation 2014-08-01

  let total_cost = parseFloat(this.total_invoice_amount.replace(/,/g, ""))
  let scrap_value = parseFloat(this.scrap_value.replace(/,/g, '')) 

  let useful_life = parseInt(this.useful_life)
  
  let diffInDays = end.diff(start, 'days').toObject().days + 1 // Difference in years (end - start) +1 to include the end date

  let dep_in_year = ( total_cost - scrap_value ) / useful_life
  let dep_in_days = parseFloat((dep_in_year / start.daysInYear ).toFixed(3))

  let financialYear

  if(start.month > 3) {
    financialYear = {
      open: DateTime.fromISO(`${start.year}-04-01`),
      close: DateTime.fromISO(`${start.year + 1}-03-31`)
    }
  } else {
    financialYear = {
      open: DateTime.fromISO(`${start.year - 1}-04-01`),
      close: DateTime.fromISO(`${start.year}-03-31`)
    }
  }

  // console.log('Start Year: ' + this.month_of_installation + " value is " + total_cost);
  // console.log("Scrap Value: " + scrap_value);
  // console.log("Useful life in years: " + useful_life);
  // console.log("Total number of days: " + diffInDays);
  // console.log("Days in current year: " + start.daysInYear);
  // console.log("Depriciation value in years: " + dep_in_year);
  // console.log("Depriciation value in days: " + dep_in_days);

  let dep_in_months = []
  let dep_in_years = []

  for (let dayIncrementer = 1; diffInDays > 0; dayIncrementer++, diffInDays--) {

    let startYear = start.year

    let luxonDate = start.plus({ days: dayIncrementer - 1})
    let date = luxonDate.toISODate()
    let {day: lastDayOfMonth, daysInMonth, year: incrementingYear, month } = luxonDate.toLocal()

    let difference = (total_cost - dep_in_days).toFixed(3)
    total_cost = difference > 0 ? difference : 0
    let totalDep = (dep_in_days * dayIncrementer).toFixed(3)

    let testYEar

    if(luxonDate.month > 3) {
      testYEar = {
        open: DateTime.fromISO(`${incrementingYear}-04-01`),
        close: DateTime.fromISO(`${incrementingYear + 1}-03-31`)
      }
    } else {
      testYEar = {
        open: DateTime.fromISO(`${incrementingYear - 1}-04-01`),
        close: DateTime.fromISO(`${incrementingYear}-03-31`)
      }
    }

    let lastDayOfTheYear = DateTime.fromISO(`${testYEar.open.year}-03-31`)

    let diffInDaysFromTodayToLastYearLastDay = Math.abs(luxonDate.diff(lastDayOfTheYear, 'days').toObject().days);

    let depForTheYear = 0

    if(luxonDate >= financialYear.open && luxonDate <= financialYear.close) {
      depForTheYear = totalDep
    } else {
      depForTheYear = (dep_in_days * diffInDaysFromTodayToLastYearLastDay).toFixed(3)
    }

    if(lastDayOfMonth == daysInMonth) {
      let val = {
        'date': date,
        'netValue': total_cost,
        'depPerDay': dep_in_days,
        'totalDep': totalDep,
        'fiscalYear': `${testYEar.open.year}-${testYEar.close.year}`,
        'depForTheYear': depForTheYear
      }
      dep_in_months.push(val)

      if(month == 3) {
        let val2 = {
          'date': date,
          'netValue': total_cost,
          'depPerDay': dep_in_days,
          'totalDep': totalDep,
          'fiscalYear': `${testYEar.open.year}-${testYEar.close.year}`,
          'depForTheYear': depForTheYear,
        }
        dep_in_years.push(val2)
      }
    } 
  }

  return { 
    'dep_in_months': dep_in_months,
    'dep_in_years': dep_in_years
  }

})

// assetSchema.virtual('depriciation_per_month').get(function () {
//   const end = DateTime.fromISO('2021-01-08') // Current year
//   const start = DateTime.fromISO(this.month_of_installation) // Year of installation 2014-08-01

//   let total_cost = parseFloat(this.total_invoice_amount.replace(/,/g, ""))
//   let scrap_value = parseFloat(this.scrap_value.replace(/,/g, '')) 

//   let useful_life = parseInt(this.useful_life)
  
//   let diffInMonths = Math.ceil(end.diff(start, 'months').toObject().months) // Difference in years (end - start)

//   let dep_in_year = Math.abs(( total_cost - scrap_value ) / useful_life) 
//   let dep_in_month = dep_in_year / 12

//   console.log('Start Year: ' + this.month_of_installation + " value is " + total_cost);
//   console.log("Scrap Value: " + scrap_value);
//   console.log("Useful life in years: " + useful_life);
//   console.log("Depriciation value in years: " + dep_in_year);
//   console.log("Depriciation value in months: " + dep_in_month);
//   console.log("Difference in months: " + diffInMonths);

//   let obj = []

//   for (let monthIncrementer = 1; diffInMonths > 0; monthIncrementer++, diffInMonths--) {

//     total_cost = total_cost - dep_in_month > 0 ? total_cost - dep_in_month : 0

//     if(Math.abs(start.plus({ months: monthIncrementer }).toLocal().month) == 3) {

//       let val = {
//         'date': start.plus({ months: monthIncrementer }).toISODate(),
//         'netValue': total_cost,
//         'totalDep': dep_in_month * monthIncrementer
//       }
//       obj.push(val)
//     }
//   }

//   console.log(obj);
//   return obj
// })

// assetSchema.virtual('depriciation_per_year').get(function () {
//   const end = DateTime.fromISO('2016-05-31') // Current year
//   const start = DateTime.fromISO(this.month_of_installation) // Year of installation 2014-08-01

//   let total_cost = parseFloat(this.total_invoice_amount.replace(/,/g, ""))
//   let scrap_value = parseFloat(this.scrap_value.replace(/,/g, '')) 

//   let useful_life = parseInt(this.useful_life)
  
//   let diffInYears = Math.ceil(end.diff(start, 'years').toObject().years) // Difference in years (end - start)

//   let dep = ( total_cost - scrap_value ) / useful_life

//   console.log('Start Year: ' + this.month_of_installation + " value is " + total_cost);
//   console.log("Scrap Value: " + scrap_value);
//   console.log("Useful life  in years: " + useful_life);
//   console.log("Depriciation value: " + dep);

//   let obj = []

//   for (let yearIncrementer = 0; diffInYears > 0; yearIncrementer++, diffInYears--) {

//   total_cost = total_cost - dep 

//     let val = {
//       'date': start.plus({ years: yearIncrementer }).toISODate(),
//       'amount': total_cost
//     }

//     obj.push(val)
//   }

//   console.log(obj);
//   return obj
// })

function validateAssetData(assetData) {
  const schema = Joi.array().items(
    Joi.object({
      asset_code: Joi.number().required(),
      category: Joi.string().required(),
      sub_category: Joi.string().required(),
      description: Joi.string(),
      vendor_name: Joi.string(),
      quantity: Joi.number(),
      location: Joi.string().required(),
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
      scrap_value: Joi.string(),
      total_invoice_amount: Joi.string(),
      amount_capitalised: Joi.string(),
      depreciation: Joi.string(),
      dep_rate: Joi.string(),
      dep_per_day: Joi.string(),
      net_block: Joi.string(),
      classification: Joi.string(),
      purchase_value: Joi.string(),
      capitalised_value: Joi.string(),
      useful_life: Joi.number(),
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
      assetCreatedBy: Joi.string().required(),
      deleteStatus: Joi.boolean(),
      visibility: Joi.boolean(),
    })
  );
  return schema.validate(assetData, { abortEarly: false });
}

function singleAsset(single) {
  const schema = Joi.object().keys({
    asset_code: Joi.any().required(),
    category: Joi.string().required(),
    sub_category: Joi.string().required(),
    description: Joi.string(),
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
    invoice_date: Joi.date().max("now").iso().required().label("Invalid date"),
    invoice_number: Joi.number(),
    scrap_value: Joi.string(),
    total_invoice_amount: Joi.string(),
    amount_capitalised: Joi.string(),
    depreciation: Joi.string(),
    dep_rate: Joi.string(),
    dep_per_day: Joi.string(),
    net_block: Joi.string(),
    classification: Joi.string(),
    purchase_value: Joi.string(),
    capitalised_value: Joi.string(),
    useful_life: Joi.number(),
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
    assetCreatedBy: Joi.string().required(),
  });

  return schema.validate(single);
}

assetSchema.post("insertMany", async function (doc) {
  const user = contextService.get("request:user");
  let userActivity = {
    action: {
      actionType: "Upload",
      count: doc.length * 1,
    },
    createdBy: { name: user.name, role: user.role },
  };
  try {
    const data = new Activity(userActivity);
    await data.save();
  } catch (error) {
    console.log(error);
  }
});

assetSchema.post("findOneAndUpdate", async function (doc) {
  const user = contextService.get("request:user");
  let userActivity = {
    action: {
      actionType: "Update",
      count: 1,
    },
    editedBy: { name: user.name, role: user.role },
    id: doc._id,
  };
  try {
    const data = new Activity(userActivity);
    await data.save();
  } catch (error) {
    console.log(error);
  }
});

assetSchema.post("deleteOne", async function (doc) {
  const user = contextService.get("request:user");
  let userActivity = {
    action: {
      actionType: "Delete",
      count: 1,
    },
    editedBy: { name: user.name, role: user.role },
    id: doc._id,
  };
  try {
    const data = new Activity(userActivity);
    await data.save();
  } catch (error) {
    console.log(error);
  }
});

const Asset = mongoose.model("Asset", assetSchema);

exports.validateAssetData = validateAssetData;
exports.singleAsset = singleAsset;
exports.Asset = Asset;
