var express = require('express');
var router = express.Router();
const auth = require('../auth/auth');
const config = require('../config');
const https = require('https');
const fs = require('fs');
const model = require('../model')




router.get('/', function (req, resp, next) {
    options = {
        client_id: config.app.client_id,
        client_secret: config.app.client_secret,
        url: "https://www.strava.com/api/v3/oauth/token",
        url: "https://www.strava.com/oauth/authorize",
        redirect_uri: config.app.redirect_uri,
        grant_type: "refresh_token",
        refresh_token: "ReplaceWithForeverToken",
        scope: "read_all,activity:read_all,profile:read_all"
    };

    const fullpath = options.url + "\
?client_id="+ options.client_id + "\
&response_type=code\
&approval_prompt=force\
&grant_type="+ options.grant_type + "\
&refresh_token="+ options.refresh_token + "\
&scope="+ options.scope + "\
&redirect_uri="+ options.redirect_uri;


    console.log(fullpath);
    resp.redirect(fullpath);

    // var connector = https.request(fullpath2, function (res) {
    //     res.pipe(resp, { end: true });//tell 'response' end=true
    // });
    // req.pipe(connector, { end: true });

    // console.log(req.query);
    // auth.authorize();
    // resp.sendfile('public/wait.html');
});

router.get('/oauth2', function (req, res, next) {
    console.log(req.query);
    auth.getToken(req.query.code).then(function (body) {
        // w to file
        console.log(body);

        //reading first
        let rawdata = fs.readFileSync(config.file.athletes);
        let athletes = JSON.parse(rawdata);

        athletes[body.athlete.id] = {
            id: body.athlete.id,
            name: body.athlete.firstname,
            code: req.query.code
        }

        // writing then
        let data = JSON.stringify(athletes);
        fs.writeFileSync(config.file.athletes, data);

    }).then(function () {
        // call model
        setTimeout(() => {
            model.firstRunOrUpdate();
            res.redirect('/test');
        }, 2000);
    })
});

module.exports = router;
