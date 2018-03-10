'use strict';

const { create, list, remove, clean, update, swap } = require('./controllers/places');

module.exports = app => {

    app.route('/places')
        .get(list)
        .post(create);

    app.route('/places/:id')
        .delete(remove)
        .patch(update);

    app.delete('/places', clean);

    app.put('/places/swap/:index1/:index2', swap);

    app.all('*', (req, res) => res.sendStatus(404));
};
