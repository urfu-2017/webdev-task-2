'use strict';

const model = require('./model');

module.exports = function (app, database, countOfPlaces) {

    app.post('/places/add', async (req, res) => {
        res.send(await model.addPlace(req, database, countOfPlaces));
        countOfPlaces += 1;
    });

    app.delete('/places/delete/:id', async (req, res) => {
        res.send(await model.deleteOne(req, database));
    });

    app.delete('/places/deleteall', async (req, res) => {
        res.send(await model.deleteAll(req, database));
        countOfPlaces = 0;
    });

    app.get('/places', async (req, res) => {
        res.send(await model.getPlaces(req, database));
    });

    app.get('/places/pages/:numberofpage', async (req, res) => {
        res.send(await model.getPlacesPage(req, database));
    });

    app.put ('/places/update/:id', async (req, res) => {
        res.send(await model.updatePlace(req, database));
    });

    app.get('/places/description', async (req, res) => {
        res.send(await model.findByDescription(req, database));
    });

    app.put('/places/site/update', async (req, res) => {
        res.send(await model.changeSite(req, database));
    });
};
