'use strict';

const placesController = require('./controllers/places');

module.exports = function (app) {
    app.post('/places', placesController.createPlace);
    app.get('/places', placesController.listPlaces);
    app.get('/places/:id', placesController.getPlace);
    app.patch('/places/:id', placesController.editPlace);
    app.put('/places/:id/index', placesController.setPlaceIndex);
    app.delete('/places/:id', placesController.deletePlace);
    app.delete('/places', placesController.clearPlaces);
    app.all('*', (req, res) => res.sendStatus(404));
};
