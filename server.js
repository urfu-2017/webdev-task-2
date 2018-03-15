'use strict';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, client) => {
    if (err) {
        console.error(err);
    }
    require('./routes.js')(app, client.db('places').collection('places'));
});

module.exports = app;
