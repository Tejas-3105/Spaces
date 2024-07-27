const { ServerMonitoringMode } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spaceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    nearestBuilding: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    outlets: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    peak: {
      type: String, // Only allow a single selection
      required: true,
    },
    time1: {
      type: String,
      required: true,
    },
    time2: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Space = mongoose.model("Space", spaceSchema);

module.exports = Space;
