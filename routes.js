'use strict';

const { create, list, remove, clean, update, swap, visit } = require('./controllers/places');

module.exports = app => {

    app.route('/places')
        .get(list)
        .post(create);

    app.route('/places/:id')
        .delete(remove)
        .patch(update)
        .post(visit);

    app.delete('/places', clean);

    app.put('/places/swap/:id1/:id2', swap);

    app.all('*', (req, res) => res.sendStatus(404));
};
