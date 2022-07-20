const assert = require('assert');
const app = require('../server')
const chai = require('chai');
const chaiHTTP = require('chai-http');
const request = require('supertest')('http://localhost:4000');
const expect = require('chai').expect;

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('teetime index request', () => {


    describe('GET /dashboard', () => {
        it("returns teetimes for current user", async () => {
            const response = await request.get("/dashboard");

            expect(response.status).to.eql(200);
        });
    });
});

