'use strict';

const model = require('./model');

module.exports = function (app, database, countOfPlaces) {

    var errRes = (res) => {
        return () => res.send({ 'error': 'An error has occurred' });
    };

    var resultRes = (res) => {
        return (result) => res.send(result);
    };

    app.post('/places/add', async (req, res) => {
        model.addPlace(req, database, countOfPlaces,
            { errRes: errRes(res), resultRes: resultRes(res) });
        countOfPlaces += 1;
    });

    app.delete('/places/delete/:id', (req, res) => {
        model.deleteOne(req, database, errRes(res), resultRes(res));
    });

    app.delete('/places/deleteall', (req, res) => {
        model.deleteAll(req, database, errRes(res), resultRes(res));
        countOfPlaces = 0;
    });

    app.get('/places', (req, res) => {
        model.getPlaces(req, database, errRes(res), resultRes(res));
    });

    app.get('/places/pages/:numberofpage', (req, res) => {
        model.getPlacesPage(req, database,
            { errRes: errRes(res), resultRes: resultRes(res) });
    });

    app.put ('/places/update/:id', (req, res) => {
        model.updatePlace(req, database, errRes(res), resultRes(res));
    });

    app.get('/places/description', (req, res) => {
        model.findByDescription(req, database, errRes(res), resultRes(res));
    });

    app.put('/places/site/update', (req, res) => {
        model.changeSite(req, database, errRes(res), resultRes(res));
    });
};
