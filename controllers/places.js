'use strict';

const Place = require('../models/place');
const places = Place.findAll();

exports.list = (req, res) => {
    const data = { places };

    res.send(data);
};

exports.create = (req, res) => {
    let description = req.params.description;
    let place = new Place({
        description
    });
    place.save();
    res.sendStatus(201);
};

exports.changeDescription = (req, res) => {
    let oldDescription = req.params.oldDescription;
    let newDescription = req.params.newDescription;
    let foundedPlace = Place.find(oldDescription);
    if (!foundedPlace) {
        res.sendStatus(404);

        return;
    }
    Place.edit(oldDescription, newDescription);
    res.sendStatus(200);
};

exports.changeMark = (req, res) => {
    Place.mark(req.params.description, req.params.mark);
    res.sendStatus(200);
};

exports.deletePlace = (req, res) => {
    let description = req.params.description;
    let foundedPlace = Place.find(description);
    if (!foundedPlace) {
        res.sendStatus(404);

        return;
    }
    Place.removePlace(description);
    res.sendStatus(200);

};

exports.deleteAll = (req, res) => {
    if (!places.length) {
        res.sendStatus(404);

        return;
    }
    res.sendStatus(200);
    Place.clearAll();
};

exports.find = (req, res) => {
    let founded = Place.find(req.params.description);
    if (!founded) {
        res.sendStatus(404);

        return;
    }
    res.send(founded);
};

exports.changeIndex = (req, res) => {
    let index = req.params.index;
    if (index < 0 || index > places.length) {
        res.sendStatus(204);

        return;
    }
    Place.changeIndex(req.params.description, index);
    res.sendStatus(200);
};

exports.dateSortAsc = (req, res) => {
    res.status(200).send(Place.dateSortAsc());
};

exports.dateSortDesc = (req, res) => {
    res.status(200).send(Place.dateSortDesc());
};

exports.abcSort = (req, res) => {
    res.status(200).send(Place.abcSort());
};

exports.paginate = (req, res) => {
    let page = req.params.page;
    let pages = Place.paginate();
    if (page < 1 || page > pages.length) {
        res.sendStatus(404);

        return;
    }
    res.status(200).send(pages[page - 1]);
};
