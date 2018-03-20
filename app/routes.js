'use strict';

const places = require('./controllers/places');
const parseQuery = require('./middlewares/listQueryParser');
const parseId = require('./middlewares/idParser');
const parseSwapQuery = require('./middlewares/swapQueryParser');

module.exports = app => {
    app.route('/places')
        .get(parseQuery, places.list)
        .delete(places.deleteAll)
        .post(places.create);

    app.get('/places/search/:description', places.findByDescription);
    app.route('/places/:id')
        .delete(parseId, places.deleteById)
        .get(parseId, places.getById);

    app.put('/places/swap', parseSwapQuery, places.swap);
    app.patch('/places/:id/description/:newValue', parseId, places.updateDescription);
    app.patch('/places/:id/mark/:newValue', parseId, places.updateMark);
};
