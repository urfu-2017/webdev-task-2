'use strict';

const Place = require('../models/place');
const places = Place.findAll();

exports.getAllPlaces = (req, res) => {
    const data = Place.findAll();
    res.send(data);
};

exports.create = (req, res) => {
    const description = req.params.description;
    if (description) {
        let place = new Place({
            description
        });
        place.save();
        res.send(places);
    } else {
        res.sendStatus(404);
    }
};

exports.deletePlace = (req, res) => {
    const id = req.params.id;
    const foundedPlace = Place.find(id, undefined);
    if (!foundedPlace) {
        res.sendStatus(404);

        return;
    }
    Place.removePlace(id);
    res.sendStatus(200);

};

exports.deleteAll = (req, res) => {
    if (!places.length) {
        res.sendStatus(404);

        return;
    }
    Place.clearAll();
    res.sendStatus(200);
};

exports.changeIndex = (req, res) => {
    const index = req.query.index;
    const id = req.query.id;
    if (index < 0 || index > places.length || id < 0 || id >= places.length) {
        res.sendStatus(204);

        return;
    }
    Place.changeIndex(id, index);
    res.status(200).send(places);
};

exports.search = (req, res) => {
    const id = req.query.id ? req.query.id : NaN;
    const description = req.query.description ? req.query.description : undefined;
    const size = req.query.size ? req.query.size : 3;
    const page = req.query.page ? req.query.page : 1;
    const sortByDate = req.query.sortByDate;
    const sortByABC = req.query.sortByABC;
    const foundedPlaces = Place.find(Number(id), description);
    const sortedPlaces = Place.sortPlaces(foundedPlaces, sortByDate, sortByABC);
    const pages = Place.paginate(sortedPlaces, Number(size), Number(page));
    res.status(200).send(pages);
};

exports.changePlace = (req, res) => {
    const id = req.query.id ? req.query.id : undefined;
    const newDescription = req.query.newDescription ? req.query.newDescription : undefined;
    const isVisited = req.query.isVisited ? req.query.isVisited : undefined;
    const edited = Place.edit(Number(id), newDescription, isVisited);
    res.status(200).send(edited);
};
