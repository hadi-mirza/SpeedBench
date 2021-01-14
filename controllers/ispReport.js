let importSpeed = require("../models/speed.js");
let importIsp = require("../models/isp.js");

function index(req,res,next) {
    res.render('ispReport.ejs')
}

module.exports = {
    index,
  };