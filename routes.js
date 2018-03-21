'use strict';

const { error404 } = require('./controllers/errors');
const { create, item, list, change, remove, swap } = require('./controllers/places');

module.exports = app => {
    app
        .route('/places')
        .get(list)
        .post(create)
        .delete(remove);

    app
        .route('/places/:id')
        .patch(change)
        .delete(remove);

    app.patch('/places/:firstId/:secondId', swap);

    app.get('/places/:description', item);

    app.all('*', error404);
};
