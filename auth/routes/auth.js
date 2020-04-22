const express = require("express");
const router = express.Router();

// External Packages
const bcrypt = require("bcryptjs");

// Local imports
const { Tenant } = require("../models/tenant");

router.post("/", async (req, res) => {
  // Check if the user is present or not
  let tenant = await Tenant.findOne({ email: req.body.email });
  if (!tenant)
    return res.status(400).send({ err: "Invalid email or password" });

  if (!tenant.status)
    return res.status(400).send({ err: "Your account access is disabled" });

  // Check password
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    tenant.password
  );
  if (!isPasswordValid)
    return res.status(400).send({ err: "Invalid email or password" });

  // Get auth token from User model
  const token = tenant.generateAuthToken();

  // Send jwt token to set
  res.send(token);
});

module.exports = router;
