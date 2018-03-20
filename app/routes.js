'use strict';

const places = require('./controllers/places');
const errors = require('./controllers/errors');

module.exports = app => {
    app.route('/places')
        .get(places.get)
        .delete(places.deleteAll);

    app.route('/places/:name')
        .get(places.getByName)
        .post(places.add)
        .delete(places.delete)
        .patch(places.update);

    app.get('*', (req, res) => {
        errors.error404(req, res).send('Requested resource not found');
    });
};
