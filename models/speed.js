// testing/demo of creating db entries

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// step 1. schema

// Schema todo: ISP, user, rating, speed

const ispSchema = new Schema({
  name: String,
  rating: {
    type: Number, 
    min: 1, 
    max: 5, 
    default: 5}
}, {
  timestamps: true
});

let speedSchema = new Schema(
  {
    speed: Number,
    location: String,
    isp: String,
  },
  {
    timestamps: true,
  }
);

let speedModel = mongoose.model("speed", speedSchema);
let ispModel = mongoose.model("isp", speedSchema);

module.exports = {
  speedModel,
  ispModel,
};
