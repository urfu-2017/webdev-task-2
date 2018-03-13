'use strict';

const log = require('./libs/log')(module);
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dbInf = require('./config/db');
const path = require('path'); // модуль для парсинга пути
let app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(express.methodOverride()); // поддержка put и delete
app.use(app.router); // модуль для простого задания обработчиков путей
app.use(express.static(path.join(__dirname, 'public'))); // запуск статического файлового сервера,
// который смотрит на папку public/


MongoClient.connect('mongodb://darl0ck:1147575@ds111319.mlab.com:11319/locations_yandex', (err, client) => {

    if (err) {
        return console.info(err);
    }
    const db = client.db('locations_yandex');
    require('./routes')(app, db);
    app.listen(1337, function () {
        console.info('Express server listening on port 1337');
    });

});

app.get('/api', function (req, res) {
    res.send('API is running');
});


app.use(function (req, res) {
    res.status(404);
    log.debug('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });

    return;
});

app.use(function (err, req, res) {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });

    return;
});

app.get('/ErrorExample', function (req, res, next) {
    next(new Error('Random error!'));
});

