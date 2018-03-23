'use strict';

const places = require('./controllers/places');

module.exports = app => {

    /* /places/list {search: (string), sortBy: "name" | "date", sortDirection: "desc"
     | "*", page: (int), limit: (int) } */
    app.post('/places/list', places.getPlaces);
    // /places/ { name: (str) }
    app.post('/places', places.addPlace);
    // /places/ {} - delete all | { id: (int) }
    app.delete('/places/', places.deletePlace);
    // /places/ {name: (str), isVisited: (bool)}
    app.patch('/places/', places.updatePlace);
    // /places/:id/position { position: (int) - с нуля до конца списка }
    app.patch('/places/:id/position/', places.swapPlace);
};
