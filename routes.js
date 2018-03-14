'use strict';

const { error404 } = require('./controllers/errors');
const { listPlaces, addPlace, clearStore, deletePlace } = require('./controllers/store');
const { findPlace, editPlace, insertPlace } = require('./controllers/store');

module.exports = app => {
    app.get('/', listPlaces);
    app.put('/', addPlace);
    app.delete('/', clearStore);
    app.get('/place', findPlace);
    app.delete('/place', deletePlace);
    app.post('/place', editPlace);
    app.put('/place', insertPlace);
    app.all('*', error404);
};
