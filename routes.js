'use strict';

const { error404 } = require('./controllers/errors');
const { append, search } = require('./controllers/places');
const { edit } = require('./controllers/placeEditor');
const { deletePlace, deleteAll } = require('./controllers/placeRemover');

module.exports = app => {
    app
        .route('/places')
        .get(search)
        .post(append)
        .delete(deleteAll);
    app
        .route('/places/:id')
        .patch(edit)
        .delete(deletePlace);
    app.all('*', error404);
};
