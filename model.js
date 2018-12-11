const strava = require('strava-v3');
const fs = require('fs');
const debug = require('debug')('strava-ui:model');
const config = require('./config');


var athletes = require(config.file.athletes);
var promises = [];
var my = {};
var fileData = config.file.fileData;
var fileStats = config.file.fileStats;
var intervalUpdate = config.stravaapi.intervalUpdate; //six hours in ms
var maxPerPage = config.stravaapi.maxPerPage;
var actType = config.stravaapi.actType;

// intervalUpdate = 10000; //test


function getData(err, payload, limits, ath, nestObj, resolve, reject) {
    if (!err) {
        if (payload) {
            ath[nestObj] = payload;
            athletes[ath.id] = ath;
            // console.log(ath);
        } else {
            console.log(payload);
        }
    }
    else {
        console.log(err);
        reject(err);
    }
    resolve(ath);
}

my.getFromStrava = function getFromStrava(callback) {


    for (var key in athletes) {
        let ath = athletes[key];
        let params = {id: ath.id, 'access_token': ath.code, per_page: maxPerPage, type: actType};
        // promise = strava.athletes.stats(params,function(err,payload,limits) {getData(err,payload,limits,ath)});

        promise = new Promise(function (resolve, reject) {
            strava.athletes.stats(params,
                function (err, payload, limits) {
                    getData(err, payload, limits, ath, 'stats', resolve, reject)
                });
        });
        promises.push(promise);

        promise = new Promise(function (resolve, reject) {
            strava.athlete.get(params,
                function (err, payload, limits) {
                    getData(err, payload, limits, ath, 'personal', resolve, reject)
                });
        });
        promises.push(promise);


        promise = new Promise(function (resolve, reject) {
            strava.athletes.listKoms(params,
                function (err, payload, limits) {
                    getData(err, payload, limits, ath, 'listkom', resolve, reject)
                });
        });
        promises.push(promise);

        promise = new Promise(function (resolve, reject) {
            strava.athlete.listActivities(params,
                function (err, payload, limits) {
                    getData(err, payload, limits, ath, 'activities', resolve, reject)
                });
        });
        promises.push(promise);
    }


    Promise.all(promises)
        .then(function (data) {
            // console.log(athletes);
            fs.writeFile(fileData, JSON.stringify(athletes), function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The data file was saved!");
            });
        })
        .then(function (data) {
            //TODO check if data are consistent - Object.keys(data).length;
            callback(athletes);
        })
        .catch(function (err) {
            //TODO should try again later?
            console.log(err)
        });
}


my.readFromCache = function readFromCache(callback) {
    fs.readFile(fileData, function (err, data) {
        if (err) throw err;
        // console.log(JSON.parse(data))
        callback(JSON.parse(data));
    });
}

my.readStats = function readFromCache(callback) {
    fs.readFile(fileStats, function (err, data) {
        if (err) throw err;
        // console.log(JSON.parse(data))
        callback(JSON.parse(data));
    });
}

my.run = function run(callback) {
    //cache reading
    my.readFromCache(callback);
    //get anytime
    // my.getFromStrava(callback);
}

my.firstRunOrUpdate = function firstRunOrUpdate() {
    my.getFromStrava(function (data) {
        var size = Object.keys(data).length;
        var obj = {size: size, time: new Date()};
        console.log('refreshing stats...', size);
        fs.writeFile(fileStats, JSON.stringify(obj), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The stats file was saved!");
        });
    })
}

//create data and stats files
//if not devel
if ((process.env.NODE_ENV) && (process.env.NODE_ENV == 'development')) {
    debug("Running application in development mode");
} else {
    my.firstRunOrUpdate();
    console.log("Running application in production mode");
}

//refreshing stats cache
setInterval(function () {
    my.firstRunOrUpdate();
}, intervalUpdate);

module.exports = my;