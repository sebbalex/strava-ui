const strava = require('strava-v3');
const fs = require('fs');


var athletes = {
    15953830: {'id': 15953830, 'name': 'Sebba', 'code': 'de13b022abc4172c989c1574e41b0ac674c404bb'},
    18102299: {'id': 18102299, 'name': 'Paris', 'code': '819cb549ca314d62a1c8996e1d31861c87bf0092'},
    4381809: {'id': 4381809, 'name': 'Marian', 'code': 'd114079660602443fa023cdf6dd8a94e9f7c3d9e'},
    3248824: {'id': 3248824, 'name': 'Danilo', 'code': 'ef0baa8a0d7a9604a7e6c537393cda0ee5ed39ec'},
    12010653: {'id': 12010653, 'name': 'Gianmarco', 'code': '1ecbf4dbf63f643cd0f9d07aeb12766545405448'},
    1281164: {'id': 1281164, 'name': 'Gabriele', 'code': '340d93382036bf3d2df7df7a28702430ae54c2b4'},
};
var promises = [];
var my = {};
var fileData = "/tmp/strava_data.json";
var fileStats = "/tmp/strava_update.json";
var intervalUpdate = 6 * 60 * 60 * 1000; //six hours in ms
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
        let params = {id: ath.id, 'access_token': ath.code};
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

function firstRun() {
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

//firstRun();


//refreshing stats cache
setInterval(function () {
    firstRun();
}, intervalUpdate);

module.exports = my;