'use strict';

const { error404 } = require('./controllers/errors');
const StoreControl = require('./controllers/store');

module.exports = app => {
    app.get('/', StoreControl.listPlaces);
    app.post('/', StoreControl.addPlace);
    app.delete('/', StoreControl.clearStore);
    app.get('/places', StoreControl.findPlace);
    app.delete('/places', StoreControl.deletePlace);
    app.put('/places', StoreControl.editPlace);
    app.post('/places', StoreControl.insertPlace);
    app.all('*', error404);
};
