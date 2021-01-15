let importSpeed = require("../models/speed.js");
let importIsp = require("../models/isp.js");

async function index(req,res,next) {
    let isps = await importIsp.ispModel.find({})
    let speeds = await importSpeed.speedModel.find({isp: 'COEXTRO-01'})
    res.render('ispReport', {isps,speeds})

}

async function show(req,res,next) {
    let ispSpeed = await importIsp.ispModel.findById(req.params.id)
    let eachSpeed = await importSpeed.speedModel.find({isp_id: req.params.id})
    res.render('showIsp', {ispSpeed,eachSpeed})
}
module.exports = {
    index,
    show,
  };