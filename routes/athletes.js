var express = require('express');
var router = express.Router();
const model = require('../model');

/* GET athletes listing. */
router.get('/', function (req, res, next) {
    model.run(function (data) {
        res.send(JSON.stringify(data));
    })

});

module.exports = router;
