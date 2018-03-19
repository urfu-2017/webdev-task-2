'use strict';

const Location = require('../../models/location');
const LocationsStorage = require('../../utils/locations-storage');

exports.findAll = (req, res) => {
    const { search, sortBy } = req.query;
    let { pageSize, pageNumber } = req.query;

    if ((pageSize && isNaN(pageSize)) || (pageNumber && isNaN(pageNumber))) {
        throw new Error('Page size and number must be numbers');
    }

    const locations = LocationsStorage.find({ query: search, sortBy, pageNumber, pageSize });
    res.json(locations);
};

exports.add = (req, res) => {
    const { description } = req.body;
    const location = new Location(String(description));
    LocationsStorage.save(location);

    res.status(201).json(location);
};

exports.update = (req, res) => {
    const { id } = req.params;
    const location = LocationsStorage.get(Number(id));
    const { description, isVisited } = req.body;

    if (!location) {
        return res.sendStatus(404);
    }

    location.update({ description: String(description), isVisited });
    LocationsStorage.save(location);

    res.sendStatus(200);
};

exports.changeOrder = (req, res) => {
    const { id, position } = req.body;
    const location = LocationsStorage.get(Number(id));

    if (!location) {
        return res.sendStatus(404);
    }

    LocationsStorage.changeOrder(location, Number(position));
    res.sendStatus(200);
};

exports.delete = (req, res) => {
    const id = req.params.id;
    const location = LocationsStorage.get(Number(id));

    if (!location) {
        return res.sendStatus(404);
    }

    LocationsStorage.delete(location);
    res.sendStatus(200);
};

exports.reset = (req, res) => {
    LocationsStorage.clear();
    res.sendStatus(200);
};
