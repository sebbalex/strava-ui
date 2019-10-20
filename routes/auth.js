var express = require('express');
var router = express.Router();
const auth = require('../auth/auth')


router.get('/oauth2', function (req, res, next) {
    console.log(req.query);
    auth.getToken(req.query.code)
});