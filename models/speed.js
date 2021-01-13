// testing/demo of creating db entries

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// step 1. schema

const ispSchema = new Schema(
  {
  name: String
});

let speedSchema = new Schema(
  {
    speed: Number,
    location: String,
    // isp: String, // change to reference
  },
  {
    timestamps: true,
  }
);

let speedModel = mongoose.model("speed", speedSchema);
let ispModel = mongoose.model("isp", ispSchema);

module.exports = {
  speedModel,
  ispModel,
};
