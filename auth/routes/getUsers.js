const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { Tenant } = require("../models/tenant");

router.post("/", auth, async (req, res) => {
  try {
    const tenants = await Tenant.find({
      orgDatabase: { $eq: req.body.db },
      role: { $ne: "senior" },
    }).select("-__v -password -userType -panNumber -orgEmail");
    res.send(tenants);
  } catch (error) {
    return res.status(500).send({ res: "Internal server error" });
  }
});

module.exports = router;
