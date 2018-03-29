'use strict';

const places = require('../controllers/places');

module.exports = app => {
    app.route('/places')
        .get(places.getByQuery)
        .delete(places.deleteAll)
        .post(places.post);

    app.route('/places/:id(\\d+)')
        .get(places.get)
        .delete(places.delete)
        .patch(places.patch);

    app.patch('/places/order', places.patchOrder);
};
