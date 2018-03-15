'use strict';

const { findPlace, edit, visit } = require('./controllers/workWithPlace');
const { create, list, deletePlace, swap, clear } = require('./controllers/workWithStorage');

module.exports = app => {
    app
        .get('/', list);

    app
        .route('/places')
        .get(list)
        .post(create)
        .delete(clear);

    app
        .route('/places/:name')
        .get(findPlace)
        .put(edit)
        .patch(visit)
        .delete(deletePlace);

    app
        .put('/places/:name/:position', swap);
};
