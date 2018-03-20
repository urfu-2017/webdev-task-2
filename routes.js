'use strict';

const model = require('./model');

module.exports = function (app, database, countOfPlaces) {

    app.post('/places/add', (req, res) => {
        model.addPlace(req, res, database, countOfPlaces);
        countOfPlaces += 1;
    });

    app.delete('/places/delete/:id', (req, res) => {
        model.deleteOne(req, res, database);
    });

    app.delete('/places/deleteall', (req, res) => {
        model.deleteAll(req, res, database);
        countOfPlaces = 0;
    });

    app.get('/places', (req, res) => {
        model.getPlaces(req, res, database);
    });

    app.get('/places/pages/:numberofpage', (req, res) => {
        model.getPlacesPage(req, res, database);
    });

    app.put ('/places/update/:id', (req, res) => {
        model.updatePlace(req, res, database);
    });

    app.get('/places/description', (req, res) => {
        model.findByDescription(req, res, database);
    });

    app.put('/places/site/update', (req, res) => {
        model.changeSite(req, res, database);
    });
};
