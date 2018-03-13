'use strict';

const places = require('./controllers/places');

module.exports = function (app) {
    app.post('/places', places.addPlace);

    app.get('/places', places.getPlaces);
    app.get('/places/sort/date', places.sortByDate);
    app.get('/places/sort/alph', places.sortByDescription);
    app.get('/places/pages', places.getPage);

    app.get('/places/search/:description', places.getPlaces);

    app.patch('/places/:id', places.changeDescription);
    app.patch('/places/:id/visited', places.updateVisited);

    app.delete('/places/:id', places.deletePlace);

    app.patch('/places/swap/:id1/:id2', places.swap);
    app.delete('/places', places.deleteAll);

    app.all('*', (req, res) => res.sendStatus(404));
};
