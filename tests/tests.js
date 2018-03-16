'use strict';
const request = require('supertest');
const assert = require('assert');
const app = require('../index');

function getPromiseTwoRequests() {
    return Promise.all([
        request(app)
            .post('/first')
            .type('application/json')
            .send({
                description: 'first note'
            })
            .expect(200),
        request(app)
            .post('/second')
            .type('application/json')
            .send({
                description: 'second note'
            })
            .expect(200)
    ]);
}

describe('GET /list', () => {
    it('save and list using sort by alphabet order by asc', done => {
        getPromiseTwoRequests()
            .then(() => {
                return request(app)
                    .get('/list?sortBy=alphabet&orderBy=asc')
                    .set('Accept', 'application/json');
            })
            .then(res => {
                assert(res.body[0].name, 'first');
                assert(res.body[1].name, 'second');
                done();
            })
            .catch(err => done(err));
    });
    it('save and list using sort by alphabet order by desc', done => {
        request(app)
            .delete('/list')
            .expect(200)
            .then(() => getPromiseTwoRequests())
            .then(() => {
                return request(app)
                    .get('/list?sortBy=alphabet&orderBy=desc')
                    .set('Accept', 'application/json');
            })
            .then(res => {
                assert(res.body[0].name, 'second');
                assert(res.body[1].name, 'first');
                done();
            })
            .catch(err => done(err));
    });
});
