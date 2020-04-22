const express = require("express");
const router = express.Router();

// External Packages
const bcrypt = require("bcryptjs");
const generateRandomPassword = require("randomstring");
const sendMail = require("../services/mailSender");

// Local imports
const { Tenant } = require("../models/tenant");

router.post("/reset", async (req, res) => {
  const { email } = req.body;

  // Check if the user is present or not
  let tenant = await Tenant.findOne({ email: email });
  if (!tenant)
    return res.status(400).send({ err: "Invalid email or password" });

  // Generate random string as password for the registered user.
  tenant.password = generateRandomPassword.generate(8);

  const unHashedPassword = tenant.password;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  tenant.password = await bcrypt.hash(tenant.password, salt);

  try {
    await tenant.save();
    await sendMail.sendCredentials(tenant.email, unHashedPassword);
    res.send({ msg: "Please check your email inbox" });
  } catch (error) {
    res.status(400).send({ err: "Internal Server Error" });
  }

  // res.send(token);
});

module.exports = router;
