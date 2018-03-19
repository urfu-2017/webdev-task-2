'use strict';

const { PlacesController } = require('./controllers/places');

const getController = (Controller, methodName) => async (req, res, next) => {
    try {
        const controller = new Controller(req, res);
        await controller[methodName]();
    } catch (e) {
        console.error(e);
        next(e);
    }
};


module.exports = app => {
    app.route('/places')
        .get(getController(PlacesController, 'listPlaces'))
        .post(getController(PlacesController, 'createPlace'))
        .delete(getController(PlacesController, 'deletePlaces'));
    app.route('/places/:id([0-9]+)')
        .put(getController(PlacesController, 'changeDescription'))
        .patch(getController(PlacesController, 'toggleVisited'))
        .delete(getController(PlacesController, 'deletePlace'));
    app.route('/places/pages/:size([0-9]+)/:number([0-9]+)')
        .get(getController(PlacesController, 'listByPages'));
    app.route('/places/:id1([0-9]+)/:id2([0-9]+)')
        .put(getController(PlacesController, 'swap'));
    app.route('/places/description')
        .get(getController(PlacesController, 'findByDescription'));
};
