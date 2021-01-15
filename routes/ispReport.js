var express = require('express');
var router = express.Router();
let ispReportCtrl = require('../controllers/ispReport.js')

/* GET home page. */
router.get('/', ispReportCtrl.index)
router.get('/:id', ispReportCtrl.show)

module.exports = router;