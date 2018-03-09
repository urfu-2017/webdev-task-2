'use strict';

const Location = require('../models/location');
const sortLocations = require('../utils/sort-locations');

exports.index = (req, res) => {
    const { search = '', sortBy = 'order', limit = 10, page = 1 } = req.query;
    let locations = Location.find(search);
    sortLocations(locations, sortBy);

    if (limit < 1 || page < 1) {
        throw new Error('Limit and page can not less then 1');
    }

    const start = limit * (page - 1);
    const end = start + limit;
    locations = locations.slice(start, end);

    res.json(locations);
};

exports.add = (req, res) => {
    const description = req.body.description;

    if (!description) {
        throw new Error('Description can not be empty');
    }

    const location = new Location(description);
    location.save();

    res.status(201).json(location);
};

exports.update = (req, res) => {
    const id = req.params.id;
    const location = Location.get(id);
    const { description = '', isVisited = location.isVisited } = req.body;

    if (description && description.length === 0) {
        throw new Error('Description can not be empty');
    }

    if (typeof(isVisited) !== 'boolean') {
        throw new Error('Flag isVisited must have boolean type');
    }

    location.description = description || location.description;
    location.isVisited = isVisited;
    location.save();

    res.sendStatus(200);
};

exports.changeOrder = (req, res) => {
    const { id, position } = req.params;
    Location.changeOrder(Number(id), Number(position));

    res.sendStatus(200);
};

exports.remove = (req, res) => {
    const id = req.params.id;
    const location = Location.get(id);

    location.delete();
    res.sendStatus(200);
};

exports.reset = (req, res) => {
    Location.clearList();
    res.sendStatus(200);
};
