let importSpeed = require('../models/speed.js')
const FastSpeedtest = require("fast-speedtest-api");

function index(req,res,next) {

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
    
    speedtest.getSpeed().then(s => {
        res.render('testSpeed', {s});
    }).catch(e => {
        console.error(e.message);
    });

    // res.render('testSpeed', {speedtest})
}

module.exports = {
    index,
}