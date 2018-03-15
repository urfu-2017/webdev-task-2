'use strict';

const { error404 } = require('./controllers/errors');
const { create, item, list, change, remove, swap } = require('./controllers/places');

module.exports = app => {
    app
        .route('/')
        .get(list)
        .post(create)
        .delete(remove);

    app
        .route('/:id')
        .patch(change)
        .delete(remove);

    app.patch('/:firstId/:secondId', swap);

    app.get('/:description', item);

    app.all('*', error404);
};
