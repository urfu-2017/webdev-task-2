'use strict';

const places = require('./controllers/places');

module.exports = app => {
    // /places?search=:search&sortBy=(name|date)&sortDir=(desc|:sortDir)&page=:page&limit=:limit
    app.get('/places', places.getPlaces);
    // /places/:name
    app.post('/places/:name', places.addPlace);
    // /places
    app.delete('/places', places.clearPlaces);
    // /places/:id
    app.delete('/places/:id', places.deletePlace);
    // /places/:id?name=:name&isVisited=:isVisited
    app.patch('/places/:id', places.updatePlace);
    // вставляет в позицию массива начиная с нулевой: /places/:id?position=:positionId
    app.put('/places/:id', places.swapPlace);
};
