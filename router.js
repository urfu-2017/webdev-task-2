'use strict';

const placeController = require('./controllers/places');

module.exports = app => {
    app.get('/places', placeController.getAll);
    app.post('/places', placeController.create);
    app.delete('/places', placeController.deleteAll);
    app.patch('/places/:id', placeController.update);
    app.delete('/places/:id', placeController.delete);
    app.get('/places/search', placeController.search);
    app.get('*', (req, res) => {
        res.sendStatus(404);
    });
};
