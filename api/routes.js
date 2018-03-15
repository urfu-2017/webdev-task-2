'use strict';

const places = require('../controllers/places');

module.exports = app => {
    app.route('/places')
        .get(places.getByFilter)
        .post(places.post)
        .delete(places.deleteAll);

    app.route('/places/:id(\\d+)')
        .get(places.get)
        .patch(places.patch)
        .delete(places.delete);

    app.route('/place/:id(\\d*)/move/:newIndex(\\d+)');
};
