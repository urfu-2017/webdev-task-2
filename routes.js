'use strict';

const placeController = require('./controllers/place');


module.exports = app => {
    app.post('/places', placeController.create);

    app.get('/places', placeController.getAll);

    app.get('/places/:id', placeController.get);

    app.patch('/places/edit/:id', placeController.edit);

    app.post('/places/:id/visit/:isVisited', placeController.visit);

    app.put('/places/swap/:index1/:index2', placeController.swap);

    app.delete('/places', placeController.clear);

    app.delete('/places/:id', placeController.delete);
};
