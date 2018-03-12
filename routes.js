'use strict';

const {
    add,
    get,
    find,
    edit,
    visit,
    unVisit,
    remove,
    clear
} = require('./controllers/place');

module.exports = (app) => {
    app.post('/place', add);
    app.get('/place', get);
    app.patch('/place', edit);
    app.delete('/place', remove);

    app.get('/place/clear', clear);
    app.get('/place/visit', visit);
    app.get('/place/unvisit', unVisit);

    app.get('/place/find', find);
};
