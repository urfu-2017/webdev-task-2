'use strict';

const { error404 } = require('./controllers/errors');
const {
    getAllPlaces,
    create,
    deletePlace,
    deleteAll,
    changeIndex,
    search,
    changePlace
} = require('./controllers/places');

module.exports = app => {
    app.get('/api/getAllPlaces', getAllPlaces);
    app.get('/api/search', search);
    app.post('/api/create/:description', create);
    app.delete('/api/delete/:id', deletePlace);
    app.delete('/api/deleteAll', deleteAll);
    app.put('/api/change', changePlace);
    app.put('/api/move', changeIndex);

    app.all('*', error404);
};
