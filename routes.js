'use strict';

const { error404 } = require('./controllers/errors');
const places = require('./controllers/places');

module.exports = app => {
    app.get('/', (req, res) => res.send('Api on /api/v1/!'));

    // Можем объединить разные http методы с одинаковым маршрутом
    app
        .route('/api/v1/places')
        .get(places.getAll);

    app
        .route('/api/v1/places/:order?')
        .put(places.updatePlace);

    app
        .get('/api/v1/place/:id?', places.getPlace)
        .delete('/api/v1/places/:id?', places.deletePlace)
        .post('/api/v1/places', places.createPlace);

    app.all('*', error404);
};
