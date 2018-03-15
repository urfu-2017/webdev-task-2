'use strict';

import { PlacesController } from './controllers/places';

module.exports = app => {
    app.post('/places/', PlacesController.add);
    app.get('/places/', PlacesController.list);
    app.get('/places/search/', PlacesController.search);
    app.put('/places/:id([0-9]+)/edit/', PlacesController.edit);
    app.put('/places/:id([0-9]+)/visited/', PlacesController.setVisited);
    app.put('/places/:id([0-9]+)/unvisited/', PlacesController.setUnvisited);    
    app.delete('/places/:id([0-9]+)/', PlacesController.delete);
    app.put('/places/:id([0-9]+)/priority/', PlacesController.changePriority);
    app.delete('/places/', PlacesController.delete);
};
