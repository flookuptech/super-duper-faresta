const express = require("express");
const router = express.Router();

// External packages
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const generateRandomPassword = require("randomstring");

// Models
const { Tenant, validateTenant } = require("../models/tenant");

// Local imports
const sendMail = require("../services/mailSender");

router.post("/", async (req, res) => {
  // To prevent tenants with similar email-id
  let tenant = await Tenant.findOne({ email: req.body.email });
  if (tenant) return res.status(500).send({ res: "Tenant already registered" });
  console.log(req.body);

  const tenantData = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    companyName: req.body.companyName,
    role: req.body.role,
    designation: req.body.designation,
    panNumber: req.body.panNumber,
    orgEmail: req.body.orgEmail,
    userType: req.body.userType,
    contact: req.body.contact,
    orgDatabase:
      req.body.companyName.toString().replace(/ /g, "").toLowerCase() + "-db",
  };

  // Perform validation checks
  const { error } = validateTenant(tenantData);
  if (error) return res.status(500).send({ err: error.details[0].message });

  tenant = new Tenant(tenantData);

  // Generate random string as password for the registered user.
  const unHashedPassword = generateRandomPassword.generate(8);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  tenant.password = await bcrypt.hash(unHashedPassword, salt);

  try {
    // Save to database
    await tenant.save();

    // Send mail to the registered tenant
    await sendMail.sendCredentials(tenant.email, unHashedPassword);

    // Get auth token from tenant model
    // const token = tenant.generateAuthToken();

    // Display data of tenant that was saved and set headers
    res.send({ res: "Tenant registered" });
  } catch (error) {
    return res.status(500).send({ res: "Tenant registration failed" });
  }
});

module.exports = router;
