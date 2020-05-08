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
    name: { type: String },
    role: { type: String },
  },
  editedBy: {
    name: { type: String },
    role: { type: String },
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  checked: {
    type: Boolean,
    default: false,
  },
  id: {
    type: mongoose.Types.ObjectId,
  },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
