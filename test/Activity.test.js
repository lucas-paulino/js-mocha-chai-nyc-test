const assert = require('assert');
const chai = require('chai');
const {expect} = require('chai');
const {Activity} = require('../src/Activity');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const axios = require('axios');

chai.use(sinonChai);

describe('Get An Activity', function () {
    const sandBox = sinon.createSandbox();

    afterEach( () => {
        sandBox.restore();
    });

    it('Expect to get an Activity correctly', function (done) {
        const activity = new Activity();
        const getStub = sandBox.stub(axios, 'get').resolves({
            data: { // mock result
                activity: 'Learn how to iceskate or rollerskate', 
                type: 'recreational', 
                participants: 1, 
                price: 0.1, 
                link: '',
                participants: 1,
                price: 0.1,
                type: "recreational"
            }
        });

        activity.getAnActivity()
            .then(function (result) {
                expect(result).to.exist;
                expect(result).to.be.an('object');
                expect(result).to.have.property('type');
                expect(result).to.have.property('participants');
                expect(getStub).to.have.been.calledOnce;
                expect(getStub).to.have.been.calledWith('https://www.boredapi.com/api/activity');
                done();
            })
            .catch(done);
    });

    it('Expect to get an social Activity for a group correctly', function (done) {
        const socialActivity = new Activity('social', '5');
        const getStub = sandBox.stub(axios, 'get').resolves({
            data: {
                activity: 'Play basketball with a group of friends',
                type: 'social',
                participants: 5,
                price: 0,
                link: '',
                key: '8683473',
                accessibility: 0.7
            }
        });

        socialActivity.getAnActivity()
            .then(function (result) {
                expect(result).to.exist;
                expect(result).to.be.an('object');
                expect(result).to.have.property('type', 'social');
                expect(result).to.have.property('participants', 5);
                expect(getStub).to.have.been.calledOnce;
                expect(getStub).to.have.been.calledWith('https://www.boredapi.com/api/activity?type=social&participants=5');
                done();
            })
            .catch(done);
    });
});
