'use strict';

const places = require('./controllers/places');
const error = require('./controllers/error');

module.exports = function (app) {
    app.use(error.preFlightCORSOnAllDomains);

    app.route('/places')
        .get(places.getPlaces)
        .post(places.addPlace)
        .delete(places.deleteAll);

    app.route('/places/:id')
        .delete(places.deletePlace)
        .patch(places.changeDescription);

    app.get('/places/sort/date', places.sortByDate);
    app.get('/places/sort/alph', places.sortByDescription);
    app.get('/places/pages', places.getPage);

    app.get('/places/search/:description', places.getPlaces);
    app.patch('/places/:id/visited', places.updateVisited);

    app.patch('/places/swap/:id1/:id2', places.swap);

    app.all('*', error.error404);
};
