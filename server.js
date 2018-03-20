/* eslint-disable linebreak-style */
'use strict';

const MongoInMemory = require('mongo-in-memory');
const port = 8000;
const mongoServerInstance = new MongoInMemory(port); // DEFAULT PORT is 27017

const log = require('./libs/log')(module);
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
let app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(express.methodOverride()); // поддержка put и delete
app.use(app.router); // модуль для простого задания обработчиков путей

mongoServerInstance.start((error, config) => {
    if (error) {
        console.error(error);
    } else {
        log.debug('HOST ' + config.host);
        log.debug('PORT ' + config.port);
        const mongouri = mongoServerInstance.getMongouri('myDatabaseName');
        MongoClient.connect(mongouri,
            (err, client) => {
                if (err) {
                    return console.info(err);
                }
                log.debug('Connected correctly to server');
                const db = client.db('myDatabaseName');
                require('./routes')(app, db);
                app.listen(1337, function () {
                    console.info('Express server listening on port 1337');
                });
            });
    }
});


