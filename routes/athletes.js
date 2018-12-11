var express = require('express');
var router = express.Router();
const model = require('../model');

/* GET athletes listing. */
router.get('/', function (req, res, next) {
    model.run(function (data) {
        res.send(JSON.stringify(data));
    })

});

router.get('/stats', function (req, res, next) {
    model.readStats(function (data) {
        res.send(JSON.stringify(data));
    })

});

router.get('/refresh', function (req, res, next) {
    model.firstRunOrUpdate();
    res.send({status: 'OK', message: 'reloading called, check /athletes/stats later'});

});

module.exports = router;
