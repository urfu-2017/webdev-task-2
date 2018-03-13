'use strict';

const { error404 } = require('./controllers/errors');
const { list, create, changeDescription, changeMark,
    deletePlace, deleteAll, find, changeIndex, dateSortAsc,
    dateSortDesc, abcSort, paginate } = require('./controllers/places');

module.exports = app => {
    app.get('/api/places', list);
    app.get('/api/places/:description', find);
    app.post('/api/places/:description', create);
    app.delete('/api/places/deleting/:description', deletePlace);
    app.delete('/api/places/deleting', deleteAll);
    app.put('/api/places/modification/description/:oldDescription/:newDescription',
        changeDescription);
    app.put('/api/places/modification/visiting/:description/:mark(true|false)', changeMark);
    app.put('/api/places/modification/index/:description/:index', changeIndex);
    app.put('/api/places/sorting/date/asc', dateSortAsc);
    app.put('/api/places/sorting/date/desc', dateSortDesc);
    app.put('/api/places/sorting/abc', abcSort);
    app.put('/api/places/paginate/:page([1-9]+)', paginate);

    app.all('*', error404);
};
