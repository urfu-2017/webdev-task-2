'use strict';

const places = require('./controllers/places');
const error = require('./controllers/error');

module.exports = function (app) {
    app.use(error.preFlightCORSOnAllDomains);

    app.use('places/:id', function (req, res, next) {
        const place = places.getById(req.params.id);
        if (!place) {
            res.send(404);

            return;
        }

        next();
    });

    app.route('/places')
        .get(places.getPlaces)
        .post(places.addPlace)
        .delete(places.deleteAll)
        .patch(places.updateVisited);

    app.route('/places/:id')
        .delete(places.deletePlace)
        .patch(places.changeDescription);

    app.get('/places/pages', places.getPage);


    app.patch('/places/swap/:id1/:id2', places.swap);

    app.all('*', error.error404);
};
