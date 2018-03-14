'use strict';

const { error404 } = require('./controllers/errors');
const {
    create,
    list,
    itemId,
    find,
    update,
    visit,
    deleteItem,
    deleteAll
} = require('./controllers/options');

const url = '/api';

module.exports = app => {
    app
        .get(url + '/places', list)
        .get(url + '/find/:id', itemId)
        .get(url + '/:feature', find);

    app.post(url + '/', create);

    app.put(url + '/:id', update);
    // .put(url + '/move/:id', move);

    app.patch(url + '/visit/:id', visit);

    app.delete(url + '/all', deleteAll);
    app.delete(url + '/:id', deleteItem);

    app.all('*', error404);
};
