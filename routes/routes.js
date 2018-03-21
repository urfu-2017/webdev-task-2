'use strict';

const { error404 } = require('../controllers/errors');
const { findAll, create, remove, reshuffle,
    item, edit, getPage } = require('../controllers/places');

module.exports = app => {
    app
        .route('/api/places')
        .get(findAll)
        .post(create)
        .delete(remove)
        .patch(reshuffle);

    app
        .route('/api/places/:id')
        .get(item)
        .patch(edit);

    app.get('/api/places/pages/:page', getPage);

    app.all('*', error404);
};
