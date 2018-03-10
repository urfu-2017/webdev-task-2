'use strict';

const placeControllers = require('./controllers/place');
const commonControllers = require('./controllers/common');


module.exports = app => {
    app.post('/place/:name', placeControllers.create);
    app.get('/place/list/:fieldSort/:order', placeControllers.list);
    app.get('/place/:name', placeControllers.find);
    app.patch('/place/edit/:name/:newName', placeControllers.edit);
    app.patch('/place/visit/:name/:isVisited', placeControllers.visit);
    app.put('/place/swap/:index1/:index2', placeControllers.swap);
    app.delete('/place/clear', placeControllers.clear);
    app.delete('/place/delete/:name', placeControllers.delete);
    app.options('*', commonControllers.options);
    app.all('*', commonControllers.error404);
};
