const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ispSchema = new Schema(
    {
    name: String,
    reports: [{type: Schema.Types.ObjectId, ref: 'speed'}],
  });

  let ispModel = mongoose.model("isp", ispSchema);

  module.exports = {
    ispModel,
  };