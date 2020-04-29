const express = require("express");
const router = express.Router();

// External packages
const bcrypt = require("bcryptjs");
const generateRandomPassword = require("randomstring");

// Models
const { Tenant, validate } = require("../models/tenant");

// Middlewares
const auth = require("../middleware/auth");

// Local imports
const sendMail = require("../services/mailSender");

router.post("/", auth, async (req, res) => {
  // To prevent tenants with similar email-id
  let tenant = await Tenant.findOne({ email: req.body.email });
  if (tenant) return res.status(500).send({ err: "Tenant already registered" });

  const tenantData = {
    companyName: req.body.companyName,
    contact: req.body.contact,
    designation: req.body.designation,
    email: req.body.email,
    role: req.body.role,
    userType: req.body.userType,
    name: req.body.name,
    registeredBy: req.body.registeredBy,
    orgDatabase:
      req.body.companyName.toString().replace(/ /g, "").toLowerCase() + "-db",
  };

  // Perform validation checks
  const { error } = validate(tenantData);
  if (error) return res.status(400).send({ err: error.details[0].message });

  tenant = new Tenant(tenantData);

  // Generate random string as password for the registered user.
  const unHashedPassword = generateRandomPassword.generate(8);

  //  Hash password
  const salt = await bcrypt.genSalt(10);
  tenant.password = await bcrypt.hash(unHashedPassword, salt);

  try {
    // Save to database
    await tenant.save();

    // Send mail to the registered tenant
    await sendMail.sendCredentials(tenant.email, unHashedPassword);

    res.send({ res: "User registered" });
  } catch (error) {
    return res.status(500).send({ err: "User registration failed" });
  }

  // Get auth token from tenant model
  // const token = tenant.generateAuthToken();
});

module.exports = router;
