let importSpeed = require("../models/speed.js");
const FastSpeedtest = require("fast-speedtest-api");
const fetch = require("node-fetch");

function index(req, res, next) {
  let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    verbose: false, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps, // default: Bps
    proxy: "http://optional:auth@my-proxy:123", // default: undefined
  });

  speedtest
    .getSpeed()
    .then((s) => {
      fetch(
        "http://ipapi.co/json/?key=ap5EaHFEzb3F4wVylNb3ukUwJNk5Fg4SvKrUCFcGgumTWFIeS4"
      ).then(function (response) {
        response.json().then((jsonData) => {
          res.render("testSpeed", { s, jsonData });
        });
      });
    })
    .catch((e) => {
      console.error(e.message);
    });
}

function create(req, res, next) {
  importSpeed.speedModel.create(
    {
      speed: Math.round(req.body.speed),
      isp: req.body.isp,
      location: req.body.location,
      rating: parseInt(req.body.rating),
    },
    function (err) {
      if (err) {
        res.send(err.message);
      }
      res.send("success");
    }
  );
}

module.exports = {
  index,
  create,
};
