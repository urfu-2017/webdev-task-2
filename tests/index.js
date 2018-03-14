'use strict';
// const request = require('supertest');
const assert = require('assert');
const request = require('request');
const fs = require('fs'); // убрать потом

const url = 'http://localhost:8080/api';

const fileNameIn = 'storage.json'; // убрать потом
let fsStorage = fs.readFileSync(fileNameIn, 'utf8'); // убрать потом
const storage = JSON.parse(fsStorage);

const app = require('../index');

describe('GET /api/places', () => {

    it('list', done => {
        console.log('storage:', storage);
        console.log('done:', done);
        let req = request(app)
            .get('/api/places')
            .expect(200, done);
        console.log('req:', req);
    });
});
