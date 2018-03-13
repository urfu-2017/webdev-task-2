'use strict';

const places = require('./controllers/places');

module.exports = app => {
    app.route('/places')
        .get(places.listPlaces)
        .post(places.createPlace)
        .delete(places.deletePlaces);
    app.route('/places/:id([0-9]+)')
        .put(places.changeDescription)
        .patch(places.toggleVisited)
        .delete(places.deletePlace);
    app.route('/places/pages/:size([0-9]+)/:number([0-9]+)')
        .get(places.listByPages);
    app.route('/places/:id1([0-9]+)/:id2([0-9]+)')
        .put(places.swap);
    app.route('/places/description')
        .get(places.findByDescription);
};
