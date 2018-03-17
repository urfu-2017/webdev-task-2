'use strict';

const { error404 } = require('./controllers/errors');
const {
    create,
    list,
    findByDescription,
    editDescription,
    editVisited,
    deleteById,
    changeOrder,
    clear
} = require('./controllers/places');

module.exports = app => {
    app.post('/places', create);
    app.get('/places', list);
    app.get('/search', findByDescription);
    app.patch('/places/:id', editDescription);
    app.put('/places/:id/visited', editVisited);
    app.delete('/places/:id/visited', editVisited);
    app.delete('/places/:id', deleteById);
    app.put('/order/:id/:position', changeOrder);
    app.delete('/places', clear);
    app.all('*', error404);
};
