const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  action: {
    actionType: { type: String },
    count: {
      type: Number,
      default: null,
    },
  },
  createdBy: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
