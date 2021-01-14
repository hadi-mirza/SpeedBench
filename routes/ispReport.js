var express = require('express');
var router = express.Router();
let ispReportCtrl = require('../controllers/ispReport.js')

/* GET home page. */
router.get('/', ispReportCtrl.index)

module.exports = router;