let importSpeed = require("../models/speed.js");
let importIsp = require("../models/isp.js");
const FastSpeedtest = require("fast-speedtest-api");
const fetch = require("node-fetch");
const ipApiToken = process.env.IPAPI_URL;

function index(req, res, next) {
  let speedtest = new FastSpeedtest({
    token: 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm', // required
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

async function create(req, res, next) {

    let userIsp = req.body.isp

    let newSpeedTest = await importSpeed.speedModel.create({speed: Math.round(req.body.speed),location: req.body.location, isp: '', isp_id: ''});

    importIsp.ispModel.findOne({name: userIsp}, async function(err,foundIsp) {

      let foundIspId = foundIsp.id
      let foundIspName = foundIsp.name
      // console.log(foundIspId)
      // console.log(newSpeedTest.id)

        if (!foundIsp) { // No ISP found and is created
            importIsp.ispModel.create({name: userIsp}, 
                async function (err, newIsp) {
                newIsp.reports.push(newSpeedTest.id)
                newSpeedTest.isp = newIsp.id
                newSpeedTest.isp_id = newIsp.id
                await newSpeedTest.save()
                let newIspResult = await newIsp.save()
                res.send('ISP does not exist. New ISP added and speed test write success!') // change this to ejs view
            })
        } else { // ISP is found
            foundIsp.reports.push(newSpeedTest.id)
            newSpeedTest.isp = foundIspName
            newSpeedTest.isp_id = foundIspId
            await newSpeedTest.save()
            let savedResult = await foundIsp.save()
            res.send(newSpeedTest)
            // res.send('ISP exists. Speed test write success!') //change this to ejs view
        }
    })


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
