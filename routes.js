'use strict';
const add = require('./controllers/add');
const list = require('./controllers/list');
const listPage = require('./controllers/listPage');
const clear = require('./controllers/clear');
const deletePlace = require('./controllers/delete');
const edit = require('./controllers/edit');
const find = require('./controllers/find');
const toggle = require('./controllers/status');
const switchPlaces = require('./controllers/switch');
const register = require('./controllers/register');

module.exports = (app) => {
    app.post('/register', register);
    app.post('/places/add', add);
    app.get('/places/list/:type', list);
    app.get('/places/list/:type/pages/:page', listPage);
    app.delete('/places/clear', clear);
    app.delete('/place/:id/delete', deletePlace);
    app.patch('/place/:id/edit', edit);
    app.get('/places/find', find);
    app.patch('/place/:id/toggle', toggle);
    app.put('/places/switch', switchPlaces);
};
