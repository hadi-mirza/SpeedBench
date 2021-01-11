let IMPORTNAME = require('../models/MODEL.js')
const FastSpeedtest = require("fast-speedtest-api");

let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    verbose: false, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps, // default: Bps
    proxy: 'http://optional:auth@my-proxy:123' // default: undefined
});
let display

speedtest.getSpeed().then(s => {
    display = document.getElementById('testResult').innerHTML(s)
    console.log(s)
}).catch(e => {
    console.error(e.message);
});

function index(req,res,next) {
    res.render('testSpeed', {display})
}


module.exports = {
    index,
}