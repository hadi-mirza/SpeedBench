let importSpeed = require("../models/speed.js");
const FastSpeedtest = require("fast-speedtest-api");
const fetch = require("node-fetch");
const ipApiToken = process.env.IPAPI_URL;
const speedApiToken = process.env.SPEEDAPI_URL;

function index(req, res, next) {
  let speedtest = new FastSpeedtest({
    token: speedApiToken, // required
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
        ipApiToken
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

    let userIsp = req.body.isp

    importSpeed.ispModel.find({name: userIsp}, function(err,results) {
        
        // console.log(userIsp)
        // console.log(typeof results)
        // console.log(results[0].name)

        if (results == '') {
            importSpeed.ispModel.create({
                name: req.body.isp,
            })
            console.log('new entry added')
        } else {
            console.log('nothing added')
        }
    })

    // importSpeed.speedModel.create(
    //     {
    //       speed: Math.round(req.body.speed),
    //       isp: req.body.isp,
    //       location: req.body.location,
    //     },
    //     function (err) {
    //       if (err) {
    //         res.send(err.message);
    //       }
    //       res.send("success");
    //     }
    //   );

    // add test data to ispModel

//       importSpeed.ispModel.create(
//     {
//       name: 'COEXTRO-01',
//     },
//     function (err) {
//       if (err) {
//         res.send(err.message);
//       }
//       res.send("success");
//     }
//   );

}

module.exports = {
  index,
  create,
};
