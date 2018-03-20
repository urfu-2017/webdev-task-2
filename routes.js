'use strict';

const { error404 } = require('./controllers/errors');
const { append, search, patch, deletePlace, deleteAll } = require('./controllers/places');

module.exports = app => {
    app
        .route('/places')
        .get(search)
        .post(append)
        .delete(deleteAll);
    app
        .route('/places/:id')
        .patch(patch)
        .delete(deletePlace);
    app.all('*', error404);
};
