let importSpeed = require("../models/speed.js");

function index(req,res,next) {
    importSpeed.speedModel.find({}, function(err,results) {
        res.render('viewAll', {results})
    })
}

async function show(req,res,next) {
    let results = await importSpeed.speedModel.findById(req.params.id)
    res.render('show', {results})
}
  
  module.exports = {
    index,
    show,
  };
  