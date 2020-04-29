const express = require("express");
const router = express.Router();

// External Packages
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

// Local imports
const { Tenant } = require("../models/tenant");

router.post("/", async (req, res) => {
  // Check if the user is present or not
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ err: error.details[0].message });

  let tenant = await Tenant.findOne({ email: req.body.email });
  if (!tenant) return res.status(400).send({ err: "Email id already in use!" });

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

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = router;
