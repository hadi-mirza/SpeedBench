let importSpeed = require("../models/speed.js");
let importIsp = require("../models/isp.js");

function index(req,res,next) {
    importSpeed.speedModel.find({}, function(err,results) {
        res.render('viewAll', {results})
    })
}

async function show(req,res,next) {
    let results = await importSpeed.speedModel.findById(req.params.id)
    res.render('show', {results})
    console.log(results)
}

async function remove(req,res) {

  let deletedEntry = await importSpeed.speedModel.findByIdAndDelete({_id: req.params.id})
  res.redirect('/view-all')
}

  module.exports = {
    index,
    show,
    remove,
  };
  