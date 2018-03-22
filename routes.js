'use strict';

const { error404 } = require('./controllers/errors');
const PlaceController = require('./controllers/place');

module.exports = app => {
    app.get('/', PlaceController.listPlaces);
    app.post('/', PlaceController.addPlace);
    app.delete('/', PlaceController.clearStore);
    app.get('/places', PlaceController.findPlace);
    app.delete('/places', PlaceController.deletePlace);
    app.put('/places', PlaceController.editPlace);
    app.post('/places', PlaceController.insertPlace);
    app.all('*', error404);
};
