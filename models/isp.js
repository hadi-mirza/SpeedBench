const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ispSchema = new Schema(
    {
    name: String,
  });

  let ispModel = mongoose.model("isp", ispSchema);

  module.exports = {
    ispModel,
  };