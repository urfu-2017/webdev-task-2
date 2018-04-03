'use strict';

const { getPlace } = require('./controllers/getPlace');
const { addPlace } = require('./controllers/addPlace');
const { removePlaces } = require('./controllers/removePlaces');
const { removeCertain } = require('./controllers/removeCertain');
const { updateCertain } = require('./controllers/updateCertain');
const { swapPlaces } = require('./controllers/swapPlaces');

module.exports = app => {

    app.route('/place')
        .get(getPlace)
        .post(addPlace)
        .delete(removePlaces);

    app.route('/place/:id')
        .delete(removeCertain)
        .patch(updateCertain);

    app.get('/swap', swapPlaces);

    app.all('*', (req, res) => {
        res.sendStatus(404);
    });
};
