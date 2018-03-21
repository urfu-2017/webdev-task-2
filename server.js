/* eslint-disable linebreak-style */
'use strict';

const MongoInMemory = require('mongo-in-memory');
const port = 8000;
const mongoServerInstance = new MongoInMemory(port); // DEFAULT PORT is 27017

const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const mongouri = mongoServerInstance.getMongouri('myDatabaseName');
console.info(mongouri);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(express.methodOverride()); // поддержка put и delete
app.use(app.router); // модуль для простого задания обработчиков путей

mongoServerInstance
    .start()
    .then(() => {
        require('./routes/routes')(app);
        app.listen(1337, function () {
            console.info('Express server listening on port 1337');

        });
    })
    .catch(err => console.error(err));


