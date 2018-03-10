'use strict';
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const places = require('./mocks/places');
const PlacesRepository = require('./dataAccess/placesRepository');
const placesRepository = new PlacesRepository();

for (const place of places) {
    placesRepository.save(place);
}

const app = express();

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

// Подключаем маршруты
routes(app);

// Фиксируем фатальную ошибку и отправляем ответ с кодом 500
app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

app.listen(8080, () => {
    console.info('Oh yeah!');
});


module.exports = app;
