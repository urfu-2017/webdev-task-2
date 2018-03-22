'use strict';

const { error404 } = require('./controllers/errors');
const { list, create, change, deletePlace, deleteAll, getPlace } = require('./controllers/places');
const { handleOptions } = require('./controllers/options');

module.exports = app => {
    app
        .post('/places', create)
        .get('/places', list)
        .get('/places/:id', getPlace)
        .patch('/places/:id', change)
        .delete('/places/:id', deletePlace)
        .delete('/places', deleteAll)
        .options('*', handleOptions);

    app.all('*', error404);
};
