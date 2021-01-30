let importSpeed = require("../models/speed.js");
let importIsp = require("../models/isp.js");
const FastSpeedtest = require("fast-speedtest-api");
const fetch = require("node-fetch");
const ipApiToken = process.env.IPAPI_URL;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


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


    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.ipdata.co/?api-key=02a538c98342086825d3a0b7e2f885b7f4bd3ca516f9c7cfbcf00b8c');
    
    request.setRequestHeader('Accept', 'application/json');
    
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        let response = JSON.parse(this.responseText)
        res.render("testSpeed", { s, response});
      }
    };
    
    request.send();
  
      // fetch('https://ipapi.co/' + ip + '/json/?key=' + ipApiToken).then(function (response) {
      //   response.json().then((jsonData) => {
      //     res.render("testSpeed", { s, jsonData, ip});
      //   });
      // });
    })
    .catch((e) => {
      console.error(e.message);
    });
}

async function create(req, res, next) {

    let userIsp = req.body.isp

    if (userIsp == 'ASN852') {
      userIsp = 'Telus'
    }
    
    if (userIsp == 'BACOM') {
      userIsp = 'Bell'
    }

    if (userIsp == 'COEXTRO-01') {
      userIsp = 'Coextro'
    }

    if (userIsp == 'ROGERS-COMMUNICATIONS') {
      userIsp = 'Rogers'
    }

    let userSpeed = req.body.speed
    let userLocation = req.body.location

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
                console.log('ISP created. Success')
            })
        } else { // ISP is found
            foundIsp.reports.push(newSpeedTest.id)
            newSpeedTest.isp = foundIsp.name
            newSpeedTest.isp_id = foundIsp.id
            await newSpeedTest.save()
            let savedResult = await foundIsp.save()
            console.log('ISP exists. Success')
        }
    })
    console.log(newSpeedTest)
    res.render('success', {newSpeedTest})
}

module.exports = {
  index,
  create,
};
