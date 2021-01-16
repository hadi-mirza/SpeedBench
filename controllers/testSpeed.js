let importSpeed = require("../models/speed.js");
let importIsp = require("../models/isp.js");
const FastSpeedtest = require("fast-speedtest-api");
const fetch = require("node-fetch");
const ipApiToken = process.env.IPAPI_URL;

function index(req, res, next) {

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

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

  speedtest.getSpeed().then((s) => {
      fetch('https://ipapi.co/' + ip + '/json/?key=ap5EaHFEzb3F4wVylNb3ukUwJNk5Fg4SvKrUCFcGgumTWFIeS4').then(function (response) {
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
    let userSpeed = req.body.speed
    let userLocation = req.body.location

    // let userIsp = 'Rogers'
    // let userSpeed = 358
    // let userLocation = 'Miami, Florida'

    // let userIsp = 'Bell'
    // let userSpeed = 78
    // let userLocation = 'Niagara Falls, Ontario'

    // let userIsp = 'Cogeco'
    // let userSpeed = 75
    // let userLocation = 'Wasaga Beach, Ontario'

    let newSpeedTest = await importSpeed.speedModel.create({speed: Math.round(userSpeed),location: userLocation, isp: '', isp_id: ''});

    importIsp.ispModel.findOne({name: userIsp}, async function(err,foundIsp) {

        if (!foundIsp) { // No ISP found and is created
            importIsp.ispModel.create({name: userIsp}, 
                async function (err, newIsp) {
                newIsp.reports.push(newSpeedTest.id)
                newSpeedTest.isp = newIsp.name
                newSpeedTest.isp_id = newIsp.id
                await newSpeedTest.save()
                let newIspResult = await newIsp.save()
                res.render('success')
            })
        } else { // ISP is found
            foundIsp.reports.push(newSpeedTest.id)
            newSpeedTest.isp = foundIsp.name
            newSpeedTest.isp_id = foundIsp.id
            await newSpeedTest.save()
            let savedResult = await foundIsp.save()
            res.render('success')
        }
    })
}

module.exports = {
  index,
  create,
};
