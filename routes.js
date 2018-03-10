'use strict';

const { error404 } = require('./controllers/errors');
const { list, create, change, deletePlace, deleteAll, getPlace } = require('./controllers/places');

module.exports = app => {
    app
        .get('/places', list)
        .get('/places/:id', getPlace)
        .post('/places', create)
        .patch('/places/:id', change)
        .delete('/places/:id', deletePlace)
        .delete('/places', deleteAll);

    app.all('*', error404);
};
