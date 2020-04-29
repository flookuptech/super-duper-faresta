const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { decryptKey } = require("../services/mailSender");

router.post("/", auth, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  decryptKey(email, password);
});

module.exports = router;
