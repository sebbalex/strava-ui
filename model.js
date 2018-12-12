const strava = require('strava-v3');
const fs = require('fs');
const debug = require('debug')('strava-ui:model');
const config = require('./config');


let my = {};
let promises = [];
let athletes = {};

const athletesLoad = require(config.file.athletes);
const fileData = config.file.fileData;
const fileStats = config.file.fileStats;
const intervalUpdate = config.stravaapi.intervalUpdate; //six hours in ms
const maxPerPage = config.stravaapi.maxPerPage;
const actType = config.stravaapi.actType;


function getData(err, payload, limits, athID, nestObj, resolve, reject) {
    if (!err) {
        if (payload) {
            athletes[athID][nestObj] = payload;
        } else {
            console.log(payload);
        }
    }
    else {
        console.log(err);
        reject(err);
    }
    resolve(athID);
}

my.getFromStrava = function getFromStrava(callback) {
    for (var key in athletesLoad) {
        let ath = athletesLoad[key];

        //precreate athletes obj out with id
        athletes[key] = {};
        let params = {id: ath.id, 'access_token': ath.code, per_page: maxPerPage, type: actType};

        promise = new Promise(function (resolve, reject) {
            strava.athletes.stats(params,
                function (err, payload, limits) {
                    getData(err, payload, limits, ath.id, 'stats', resolve, reject)
                });
        });
        promises.push(promise);

        promise = new Promise(function (resolve, reject) {
            strava.athlete.get(params,
                function (err, payload, limits) {
                    getData(err, payload, limits, ath.id, 'personal', resolve, reject)
                });
        });
        promises.push(promise);

        //
        promise = new Promise(function (resolve, reject) {
            strava.athletes.listKoms(params,
                function (err, payload, limits) {
                    getData(err, payload, limits, ath.id, 'listkom', resolve, reject)
                });
        });
        promises.push(promise);

        promise = new Promise(function (resolve, reject) {
            strava.athlete.listActivities(params,
                function (err, payload, limits) {
                    getData(err, payload, limits, ath.id, 'activities', resolve, reject)
                });
        });
        promises.push(promise);
    }


    Promise.all(promises)
        .then(function (data) {
            //data here doesnt contain anything
            my.writeToFile(athletes);
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

my.writeStatsToFile = function writeStatsToFile(data) {
    fs.writeFile(fileStats, JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The stats file was saved!");
    });
}
my.writeToFile = function writeToFile(data) {
    fs.writeFile(fileData, JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The data file was saved!");
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
        my.writeStatsToFile(obj);
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