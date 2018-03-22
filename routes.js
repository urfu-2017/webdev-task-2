'use strict';

const { clearAll,
    create,
    deletePlace,
    edit,
    findPlace,
    list,
    swap,
    visit } = require('./controllers/describeMethods.js');

module.exports = app => {
    app
        .delete('/clearAll', clearAll)//
        .post('/create/:name/:description', create)//
        .delete('/deletePlace', deletePlace)//
        .put('/edit', edit)//
        .get('/list', list)//
        .put('/swap', swap)
        .get('/findPlace', findPlace)//
        .patch('/visit', visit);
};
