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
    client.db('places').collection('places')
        .find()
        .sort({ site: -1 })
        .limit(1)
        .toArray((subErr, items) => {
            if (subErr) {
                console.error(subErr);
            }
            let count = items.length === 0 ? 0 : items[0].site + 1;
            require('./routes.js')(app, client.db('places').collection('places'), count);
        });
});

module.exports = app;
