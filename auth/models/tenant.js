const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const tenantSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    default: true,
  },
  companyName: {
    type: String,
    minlength: 3,
  },
  panNumber: {
    type: String,
    minlength: 3,
  },
  orgEmail: {
    type: String,
    minlength: 3,
  },
  contact: {
    type: String,
    minlength: 10,
  },
  designation: {
    type: String,
    minlength: 3,
  },
  email: {
    type: String,
    minlength: 5,
    unique: true,
  },
  password: {
    type: String,
    minlength: 3,
  },
  role: {
    type: String,
    minlength: 2,
  },
  userType: {
    type: String,
  },
  orgDatabase: {
    type: String,
    minlength: 3,
  },
  name: {
    type: String,
    minlength: 3,
  },
  registeredBy: {
    type: String,
  },
  address: {
    type: String,
    minlength: 3,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

tenantSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      status: this.status,
      userType: this.userType,
      companyName: this.companyName,
      orgDatabase: this.orgDatabase,
    },
    process.env.FAR_JWT_PRIVATEKEY
  );
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    companyName: Joi.string().min(3).required(),
    email: Joi.string().min(5).max(255).required().email(),
    contact: Joi.string().min(10).max(10).required(),
    designation: Joi.string().min(3).required(),
    role: Joi.string().min(2).required(),
    orgDatabase: Joi.string().required(),
    userType: Joi.string().required(),
    registeredBy: Joi.string().required(),
  });
  return schema.validate(user);
}

function validateTenant(tenant) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    companyName: Joi.string().min(3).required(),
    email: Joi.string().min(5).max(255).required().email(),
    orgEmail: Joi.string().min(5).max(255).required().email(),
    contact: Joi.string().min(10).max(10).required(),
    designation: Joi.string().min(3).required(),
    role: Joi.string().min(2).required(),
    orgDatabase: Joi.string().required(),
    userType: Joi.string().required(),
    address: Joi.string().min(3).required(),
    panNumber: Joi.string().required(),
  });
  return schema.validate(tenant);
}

const Tenant = mongoose.model("Tenant", tenantSchema);

exports.Tenant = Tenant;
exports.validate = validateUser;
exports.validateTenant = validateTenant;
