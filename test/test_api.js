const chai = require('chai');
const config = require('../config');
const https = require('https');
const app = require('../app');
const chaiHttp = require('chai-http');
const should = chai.should();
// const version = 'v' + config.version.split('.')[0];
const version = '';
// const endpoint = '/api/' + version;
const endpoint = '/athletes';

chai.use(chaiHttp);
const expect = chai.expect;


describe('GET /athletes', () => {
    it('it should GET atheletes data', (done) => {
        chai.request(app)
            .get(endpoint)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('Object');
                expect(res.body).to.not.be.empty;
                done();
            });
    });
});

describe('GET /athletes/stats', () => {
    it('it should GET statistic for saved data file', (done) => {
        chai.request(app)
            .get(endpoint + '/stats')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('Object');
                expect(res.body).to.not.be.empty;
                // expect(res.body.error).to.contain('This operator doesn\'t exists');
                done();
            });
    });
});

describe('GET /athletes/charts', () => {
    it('it should GET chart json customization rules', (done) => {
        chai.request(app)
            .get(endpoint + '/charts')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('Array');
                expect(res.body).to.not.be.empty;
                done();
            });
    });
});
//
describe('GET /athletes/refresh', () => {
    it('it should refresh and GET stats', (done) => {
        chai.request(app)
            .get(endpoint + '/refresh')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('Object');
                expect(res.body).to.not.be.empty;
                done();
            });
    });
});

