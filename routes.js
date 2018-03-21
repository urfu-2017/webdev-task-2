'use strict';

var { Router } = require('express');

var appRouter = new Router();

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

appRouter
    .get('', list)
    .get('/:feature', find)
    .get('/find/:id', itemId);

appRouter.post('/', create);

appRouter
    .put('/:id', update)
    .put('/visit/:id', visit);

appRouter
    .delete('/all', deleteAll)
    .delete('/:id', deleteItem);

appRouter.all('*', error404);

module.exports = appRouter;
