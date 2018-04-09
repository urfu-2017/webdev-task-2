'use strict';

var express = require('express');
const { error404 } = require('./controllers/errors');
const places = require('./controllers/places');

module.exports = app => {
    app.get('/', (req, res) => res.send('Api on /api/v1/!'));

    const apiV1 = new express.Router();

    // Можем объединить разные http методы с одинаковым маршрутом
    apiV1
        .route('/places')
        .get(places.getAll);

    apiV1
        .route('/places/:order?')
        .patch(places.updatePlace);

    apiV1
        .route('/places/:id?')
        .get(places.getPlace)
        .delete(places.deletePlace);

    apiV1
        .post('/places', places.createPlace);

    app.use('/api/v1', apiV1);
    app.all('*', error404);
};
