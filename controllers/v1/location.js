'use strict';

const Location = require('../../models/location');
const LocationStorage = require('../../utils/locations-storage');

const locationsStorage = new LocationStorage();

exports.findAll = (req, res) => {
    const { search = '', sortBy = 'order', pageSize = 10, pageNumber = 1 } = req.query;
    let locations = locationsStorage.find(search, sortBy);

    if (pageSize < 1 || pageNumber < 1) {
        throw new Error('Page size and number can not less then 1');
    }

    const start = pageSize * (pageNumber - 1);
    const end = start + pageSize;
    locations = locations.slice(start, end);

    res.json(locations);
};

exports.add = (req, res) => {
    const { description } = req.body;

    if (!description) {
        throw new Error('Description can not be empty');
    }

    const location = new Location(description);
    locationsStorage.save(location);

    res.status(201).json(location);
};

exports.update = (req, res) => {
    const { id } = req.params;
    const location = locationsStorage.get(id);

    if (!location) {
        return res.sendStatus(404);
    }

    const { description = '', isVisited = location.isVisited } = req.body;

    if (description && description.length === 0) {
        throw new Error('Description can not be empty');
    }

    if (typeof(isVisited) !== 'boolean') {
        throw new Error('Flag isVisited must have boolean type');
    }

    location.description = description || location.description;
    location.isVisited = isVisited;

    locationsStorage.save(location);

    res.sendStatus(200);
};

exports.changeOrder = (req, res) => {
    const { id, position } = req.body;
    const location = locationsStorage.get(id);

    if (!location) {
        return res.sendStatus(404);
    }

    locationsStorage.changeOrder(Number(id), Number(position));

    res.sendStatus(200);
};

exports.delete = (req, res) => {
    const id = req.params.id;
    const location = locationsStorage.get(id);

    if (!location) {
        return res.sendStatus(404);
    }

    locationsStorage.delete(location);
    res.sendStatus(200);
};

exports.reset = (req, res) => {
    locationsStorage.clear();
    res.sendStatus(200);
};
