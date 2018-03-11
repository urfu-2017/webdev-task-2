'use strict';

const places = require('./controllers/places');
const errors = require('./controllers/errors');

module.exports = app => {
    app.route('/places')
        .get(places.get)
        .post(places.add)
        .delete(places.deleteAll);

    app.route('/places/:name')
        .get(places.getByName)
        .delete(places.delete)
        .patch(places.update);

    app.get('*', (req, res) => {
        errors.error404(req, res).send('Requested resourse not found');
    });
};
