'use strict';
const add = require('./controllers/add');
const list = require('./controllers/list');
const clear = require('./controllers/clear');
const deletePlace = require('./controllers/delete');
const edit = require('./controllers/edit');
const find = require('./controllers/find');
const toggle = require('./controllers/status');
const switchPlaces = require('./controllers/switch');

module.exports = (app) => {
    app.post('/add', add);
    app.get('/list', list);
    app.delete('/clear', clear);
    app.delete('/delete', deletePlace);
    app.patch('/edit', edit);
    app.get('/find', find);
    app.patch('/toggle', toggle);
    app.put('/switch', switchPlaces);
};
