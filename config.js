var package = require('./package.json');


var config = {
    name: package.name,
    version: package.version,
    // mount: package.name,
    // production: process.env.NODE_ENV === "production",
    // maxlimit: process.env.MAXLIMIT || 100
};

config.express = {
    port: process.env.EXPRESS_PORT || 3000,
    ip: process.env.EXPRESS_IP || "localhost"
};

config.file = {
    fileData: process.env.FILE_DATA || '/tmp/strava_data.json',
    fileStats: process.env.FILE_STATS || '/tmp/strava_update.json',
    athletes: process.env.FILE_ATHS || './athletes.json'
}

config.app = {
    client_id: process.env.CLIENT_ID || 'xxxx',
    client_secret: process.env.CLIENT_SECRET || 'xxxxxxxxxxxxxx',
    redirect_uri: process.env.REDIRECT_URI || 'http://localhost:3000/oauth2'
}

config.stravaapi = {
    intervalUpdate: process.env.INTERVAL_UPDATE || 6 * 60 * 60 * 1000,
    maxPerPage: process.env.MAX_PER_PAGE || 150,
    actType: process.env.ACT_TYPE || 'Ride'
}

module.exports = config;
