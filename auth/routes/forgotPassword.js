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

  if (!email) return res.status(400).send({ err: "Enter a valid email" });

  // Check if the user is present or not
  let tenant = await Tenant.findOne({ email: email });
  if (!tenant)
    return res.status(400).send({ err: "Invalid email or password" });

  // Generate random string as password for the registered user.
  const unHashedPassword = generateRandomPassword.generate(8);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  tenant.password = await bcrypt.hash(unHashedPassword, salt);

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
