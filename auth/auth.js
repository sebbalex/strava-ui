const https = require('https');
const config = require('../config');


authorize = () => {
    conf = {
        client_id: config.app.client_id,
        client_secret: config.app.client_secret,
        url: "https://www.strava.com/api/v3/oauth/token",
        redirect_uri: "http://localhost:3000/oauth2",
        grant_type: "refresh_token",
        refresh_token: "ReplaceWithForeverToken",
        scope: "read_all,activity:read_all,profile:read_all"
    };

    const options = new URL(conf.url);
    console.log(options, conf);
    
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
            process.stdout.write(d)
            // Write to file
            // ...
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

getToken = (code) => {
    return new Promise((resolve, reject) => {
        const fullPath = `/api/v3/oauth/token?client_id=${config.app.client_id}&client_secret=${config.app.client_secret}&code=${code}&grant_type=authorization_code`;

        const options = {
            hostname: 'www.strava.com',
            port: 443,
            path: fullPath,
            method: 'POST'
        }

        console.log(options)
        const reqs = https.request(options, (ress) => {
            // console.log('statusCode:', ress.statusCode);
            // console.log('headers:', ress.headers);

            // cumulate data
            var body = [];
            ress.on('data', (chunk) => {
                body.push(chunk);
            });
            // resolve on end
            ress.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                    // console.log(body);
                    
                } catch (e) {
                    console.error(e)
                    reject(e);
                }
                resolve(body);
            });
        });

        reqs.on('error', (e) => {
            console.error(e);
        });

        reqs.end();
    });
}

module.exports = {
    authorize,
    getToken
}