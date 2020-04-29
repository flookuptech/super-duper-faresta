const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { Tenant } = require("../models/tenant");

router.get("/", auth, async (req, res) => {
  const tenants = await Tenant.find({ role: { $eq: "senior" } }).select(
    "-__v -password -userType"
  );
  res.send(tenants);
});

module.exports = router;
