'use strict';

const { error404 } = require('./controllers/errors');
const {
    create,
    listByDefault,
    listByCreatedAt,
    listByAlphabet,
    listPaginal,
    findByDescr,
    editDescr,
    editVisited,
    deleteById,
    changeOrder,
    clear
} = require('./controllers/places');

module.exports = app => {
    app.post('/create', create);
    app.get('/listByDefault', listByDefault);
    app.get('/listByCreatedAt', listByCreatedAt);
    app.get('/listByAlphabet', listByAlphabet);
    app.get('/listPaginal/:pageNumber/:pageSize', listPaginal);
    app.get('/description', findByDescr);
    app.patch('/description/:id', editDescr);
    app.patch('/visited/:id', editVisited);
    app.delete('/delete/:id', deleteById);
    app.put('/order/:id/:position', changeOrder);
    app.delete('/clear', clear);
    app.all('*', error404);
};
