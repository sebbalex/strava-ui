var express = require('express');
var router = express.Router();
const model = require('../model');
const charts = require('../charts');

/* GET athletes listing. */
router.get('/', function (req, res, next) {
    model.run(function (data) {
        res.json(data);
    })

});

router.get('/stats', function (req, res, next) {
    model.readStats(function (data) {
        res.json(data);
    })

});

router.get('/refresh', function (req, res, next) {
    model.firstRunOrUpdate();
    res.json({status: 'OK', message: 'reloading called, check /athletes/stats later'});

});

router.get('/charts', function (req, res, next) {
    res.json(charts);

});

module.exports = router;
