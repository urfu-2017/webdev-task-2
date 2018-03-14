'use strict';

const { error404 } = require('./controllers/errors');
const { append, search } = require('./controllers/places');
const { edit } = require('./controllers/placeEditor');

module.exports = app => {
    app
        .route('/places')
        .get(search)
        .post(append);
    app.patch('/places/:id', edit);
    app.all('*', error404);
};
