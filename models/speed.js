// testing/demo of creating db entries

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// step 1. schema

// Schema todo: ISP, user, rating, speed

// const reviewSchema = new Schema({
//   rating: {type: Number, min: 1, max: 5, default: 5}
// }, {
//   timestamps: true
// });

let speedSchema = new Schema(
  {
    speed: Number,
    location: String,
    isp: String,
    // rating: [reviewSchema]
  },
  {
    timestamps: true,
  }
);

let speedModel = mongoose.model("speed", speedSchema);
// let reviewModel = mongoose.model('rating', reviewSchema)

module.exports = {
  speedModel,
  // reviewModel,
};
