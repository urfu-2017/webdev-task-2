'use strict';

const { create, list, clear, swap } = require('./controllers/workWithStorage');
const { findPlace, edit, visit, deletePlace } = require('./controllers/workWithPlace');

module.exports = app => {
    app
        .get('/', list);

    app
        .route('/places')
        .post(create)
        .get(list)
        .put(swap)
        .delete(clear);

    app
        .route('/places/:name')
        .get(findPlace)
        .put(edit)
        .patch(visit)
        .delete(deletePlace);
};
