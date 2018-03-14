'use strict';

const { error404 } = require('./controllers/errors');
const { append, search } = require('./controllers/places');

module.exports = app => {
    app
        .route('/places')
        .get(search)
        .post(append);
    app.all('*', error404);
};
