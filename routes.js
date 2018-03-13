'use strict';

const controller = require('./controllers/places');
const errors = require('./controllers/errors');

module.exports = app => {
    app
        .get('/', controller.getPlaces)
        .get('/pages/:number([0-9]+)', controller.getPlacesPage)
        .get('/search', controller.searchPlaces)
        .delete('/', controller.removePlaces)
        .patch('/swapped', controller.swapPlaces)
        .post('/', controller.createPlace)
        .patch('/', controller.editPlace)
        .all('*', errors.error404);
};
