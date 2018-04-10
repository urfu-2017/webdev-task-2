'use strict';

const places = require('./controllers/places');
const errors = require('./controllers/errors');

const castId = (req, res, next) => {
    req.params.id = Number(req.params.id);
    next();
};

module.exports = app => {
    app.route('/places')
        .get(places.get)
        .post(places.add)
        .delete(places.deleteAll);

    app.route('/places/:id')
        .get(castId, places.getById)
        .delete(castId, places.delete)
        .patch(castId, places.update);

    app.get('*', (req, res) => {
        errors.error404(req, res).send('Requested resource not found');
    });
};
