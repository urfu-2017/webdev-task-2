/* eslint-env mocha */
'use strict';

const request = require('supertest');
const { series } = require('async');
const assert = require('assert');

const app = require('../index');

describe('GET /', () => {
    it('Возвращает добавленное место непосещенным', done => {
        series([
            callback => {
                request(app)
                    .post('/place')
                    .type('form')
                    .send({
                        name: 'place3',
                        description: 'place3 description'
                    })
                    .expect(201)
                    .expect(res => {
                        if (!(res.body.name && res.body.name === 'place3' && !res.body.visited)) {
                            throw new Error('failed');
                        }
                    })
                    .end(callback);
            },
            callback => {
                request(app)
                    .post('/place')
                    .type('form')
                    .send({
                        name: 'place2',
                        description: 'place2 description'
                    })
                    .end(callback);
            },
            callback => {
                request(app)
                    .post('/place')
                    .type('form')
                    .send({
                        name: 'place1',
                        description: 'place1 description'
                    })
                    .end(callback);
            }],
        (err) => {
            if (err) {
                return done(err);
            }

            return done();
        });
    });

    it('Вовращает код 400', done => {
        request(app)
            .post('/place')
            .type('form')
            .send({
                name: '123'
            })
            .expect(400)
            .end(done);
    });

    it('Возвращает список место в порядке добавления', done => {
        request(app)
            .get('/place')
            .expect(200)
            .expect(res => {
                let placeNames = res.body.map(place => place.name);

                assert.deepEqual(placeNames, ['place3', 'place2', 'place1']);
            })
            .end(done);
    });

    it('Сортирует по имени и выводит первую страницу', done => {
        request(app)
            .get('/place')
            .query({
                sortBy: 'name',
                page: 1,
                pageCount: 2
            })
            .expect(200)
            .expect(res => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].name, 'place3');
            })
            .end(done);
    });

    it('Находит место по имени', done => {
        request(app)
            .get('/place/find')
            .type('form')
            .send({
                name: 'place3'
            })
            .expect(200)
            .expect(res => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].name, 'place3');
            })
            .end(done);
    });

    it('Редактирует запись по имени', (done) => {
        series([
            callback => {
                request(app)
                    .patch('/place')
                    .type('form')
                    .send({
                        find: {
                            name: 'place2'
                        },
                        data: {
                            description: 'new description'
                        }
                    })
                    .expect(200)
                    .end(callback);
            },
            callback => {
                request(app)
                    .get('/place/find')
                    .type('form')
                    .send({
                        name: 'place2'
                    })
                    .expect(200)
                    .expect(res => {
                        assert.equal(res.body[0].description, 'new description');
                    })
                    .end(callback);
            }
        ], done);
    });

    it('Посещает место', done => {
        series([
            callback => {
                request(app)
                    .get('/place/visit')
                    .type('form')
                    .send({
                        name: 'place2'
                    })
                    .expect(200)
                    .end(callback);
            },
            callback => {
                request(app)
                    .get('/place/find')
                    .type('form')
                    .send({
                        name: 'place2'
                    })
                    .expect(200)
                    .expect(res => {
                        assert.equal(res.body[0].visited, true);
                    })
                    .end(callback);
            }
        ], done);
    });

    it('Очищает список', done => {
        series([
            callback => {
                request(app)
                    .get('/place/clear')
                    .expect(200)
                    .end(callback);
            },
            callback => {
                request(app)
                    .get('/place')
                    .expect(200)
                    .expect(res => {
                        assert.equal(res.body.length, 0);
                    })
                    .end(callback);
            }
        ], done);
    });
});
