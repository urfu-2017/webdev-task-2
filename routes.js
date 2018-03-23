'use strict';

const { clearAll,
    create,
    deletePlace,
    edit,
    findPlace,
    list,
    pagination,
    swap,
    visit } = require('./controllers/describe-methods.js');

module.exports = app => {
    app
        .get('/places', list)
        .get('/search', findPlace)
        .get('/page', pagination)
        .put('/places/:id/visited', visit)
        .post('/places', create)
        .patch('/places/order', swap)
        .patch('/edit/:id', edit)
        .delete('/places', clearAll)
        .delete('/places/:id', deletePlace)
        .delete('/places/:id/visited', visit);
};
