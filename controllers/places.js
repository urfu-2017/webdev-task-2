'use strict';

const Place = require('../models/place');
const errors = require('./errors');

const orderings = {
    name: function (p1, p2) {
        return p1.name < p2.name ? -1 : 1;
    },
    date: function (p1, p2) {
        return p1.createdAt - p2.createdAt;
    }
};

let localPlaces = [];

exports.get = (req, res) => {
    let { order, limit, offset, query } = req.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;

    let sortingFun = orderings[order];
    let requestedPlaces = localPlaces.slice(offset, limit + offset);

    if (query) {
        requestedPlaces = requestedPlaces.filter(({ description }) => {
            return description.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
    }

    if (sortingFun) {
        requestedPlaces.sort(sortingFun);
    }

    if (requestedPlaces.length) {
        res.json(requestedPlaces);
    } else {
        // Лучше возвращать пустой список или 404?
        errors.error404(req, res).send('Places not found');
    }
};

exports.getByName = (req, res) => {
    let placeName = req.params.name;
    let requestedPlace = localPlaces.find(({ name }) => name === placeName);

    if (requestedPlace) {
        res.json(requestedPlace);
    } else {
        errors.error404(req, res).send('Place not found');
    }
};

exports.add = (req, res) => {
    let placeName = req.body.name;
    let desc = req.body.description;
    let isAlreadyAdded = Boolean(localPlaces.find(({ name }) => name === placeName));

    if (isAlreadyAdded) {
        errors.error400(req, res).send(`Place (${placeName}) has already been added`);

        return;
    }

    if (!placeName) {
        errors.error400(req, res).send(`Name is not specified at ${req.method} request`);

        return;
    }

    if (!desc) {
        errors.error400(req, res).send(`Description is not specified at ${req.method} request`);

        return;
    }

    localPlaces.push(new Place(placeName, desc, Date.now()));

    res.status(201).send(`Added note: ${placeName}`);
};

exports.delete = (req, res) => {
    let placeName = req.params.name;
    let indexToDelete = localPlaces.findIndex(({ name }) => name === placeName);

    if (indexToDelete !== -1) {
        localPlaces.splice(indexToDelete, 1);

        res.sendStatus(204);
    } else {
        errors.error404(req, res).send('Place not found');
    }
};

exports.deleteAll = (req, res) => {
    localPlaces = [];

    res.sendStatus(204);
};

exports.update = (req, res) => {
    let placeName = req.params.name;
    // to - на какую позицию в списке нужно переместить место
    let to = req.body.moveTo;
    let placeToUpdate = localPlaces.find(({ name }) => name === placeName);

    if (!placeToUpdate) {
        errors.error404(req, res).send('Place not found');

        return;
    }

    if (to !== undefined) {
        let from = localPlaces.findIndex(({ name }) => name === placeName);
        localPlaces.move(from, to);
    }
    // toUpdate содержит поля, которые нужно обновить
    Object.assign(placeToUpdate, req.body.toUpdate);

    res.sendStatus(204);
};

localPlaces.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
