let importSpeed = require("../models/speed.js");
let importIsp = require("../models/isp.js");
const FastSpeedtest = require("fast-speedtest-api");
const ipDataToken = process.env.IPDATA_API
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


async function index(req, res, next) {

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  let speedtest = await new FastSpeedtest({
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
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.ipdata.co/?api-key=' + ipDataToken);
    request.setRequestHeader('Accept', 'application/json');
    request.onreadystatechange =  function () {
      if (this.readyState === 4) {
        let response = JSON.parse(this.responseText)
        res.render("testSpeed", { s, response});
      }
    };
    request.send();
    })
}

async function create(req, res, next) {

    let userIsp = req.body.isp

    let userSpeed = req.body.speed
    let userLocation = req.body.location
    let userThreat = req.body.threat
    let userCurrency = req.body.currency
    let userCountry = req.body.country
    let newSpeedTest = await importSpeed.speedModel.create({speed: Math.round(userSpeed),location: userLocation, isp: '', isp_id: '', country: userCountry, threat: userThreat, currency: userCurrency});

    importIsp.ispModel.findOne({name: userIsp}, async function(err,foundIsp) {

        if (!foundIsp) { // No ISP found and is created
            importIsp.ispModel.create({name: userIsp}, 
                async function (err, newIsp) {
                newIsp.reports.push(newSpeedTest.id)
                newSpeedTest.isp = newIsp.name
                newSpeedTest.isp_id = newIsp.id
                await newSpeedTest.save()
                let newIspResult = await newIsp.save()
            })
        } else { // ISP is found
            foundIsp.reports.push(newSpeedTest.id)
            newSpeedTest.isp = foundIsp.name
            newSpeedTest.isp_id = foundIsp.id
            await newSpeedTest.save()
            let savedResult = await foundIsp.save()
        }
    })
    res.render('success', {newSpeedTest})
}

module.exports = {
  index,
  create,
};
