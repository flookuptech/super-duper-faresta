const express = require("express");
const router = express.Router();

const { Tenant } = require("../models/tenant");

router.post("/changeStatus", async (req, res) => {
  const { user } = req.body;
  const status = user.status;
  try {
    await Tenant.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          status: status,
        },
      },
      { new: true }
    );
    res.send({ msg: "Status changed" });
  } catch (error) {
    res.status(500).send({ err: "Failed to change status" });
  }
});

module.exports = router;
