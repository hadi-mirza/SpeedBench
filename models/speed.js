const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const speedSchema = new Schema(
  {
    speed: Number,
    location: String,
  },
  {
    timestamps: true,
  }
);

let speedModel = mongoose.model("speed", speedSchema);

module.exports = {
  speedModel,
};
