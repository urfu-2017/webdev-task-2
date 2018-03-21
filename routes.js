'use strict';

const actions = require('./controllers/place');

module.exports = app => {
    app
        .route('/')
        .post(actions.addNewPlace)
        .get(actions.getPlacesList)
        .patch(actions.swapPlaces)
        .delete(actions.clearSchedule);
    app
        .route('/place')
        .get(actions.searchByName)
        .put(actions.editPlace)
        .post(actions.markPlace)
        .delete(actions.deletePlace);
    app.all('*', (req, res) => {
        res.sendStatus(404);
    });
};
