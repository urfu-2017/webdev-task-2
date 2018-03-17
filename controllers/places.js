'use strict';

const Place = require('../models/place');

exports.create = (req, res) => {
    const { description } = req.body;
    const place = Place.create(description);
    res.status(201).json(place);
};

exports.list = (req, res) => {
    const order = req.query.order;
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    let result = Place.list();
    if (order === 'date') {
        result = Place.listByDate();
    }
    if (order === 'description') {
        result = Place.listByDescription();
    }
    if (pageNumber && pageSize) {
        result = Place.listPaginal(result, Number(pageNumber), Number(pageSize));
    }
    res.status(200).json(result);
};

exports.findByDescription = (req, res) => {
    const place = Place.find('description', req.query.description.toLowerCase());
    if (place === undefined) {
        res.sendStatus(404);
    } else {
        res.status(200).json(place);
    }
};

exports.editDescription = (req, res) => {
    const place = Place.editDescription(Number(req.params.id), req.query.description);
    const placeNotExists = place === -1;
    if (placeNotExists) {
        res.sendStatus(204);
    } else {
        res.status(200).json(place);
    }
};

exports.editVisited = (req, res) => {
    let visited = false;
    if (req.method === 'PUT') {
        visited = true;
    }
    const place = Place.editVisited(Number(req.params.id), visited);
    const placeNotExists = place === -1;
    if (placeNotExists) {
        res.sendStatus(204);
    } else {
        res.status(200).json(place);
    }
};

exports.deleteById = (req, res) => {
    const deleted = Place.delete('id', Number(req.params.id));
    if (deleted) {
        res.status(200).json(deleted);
    } else {
        res.sendStatus(204);
    }
};

exports.changeOrder = (req, res) => {
    const success = Place.changeOrder(Number(req.params.id), Number(req.params.position));
    if (success) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

exports.clear = (req, res) => {
    Place.clear();
    res.sendStatus(200);
};
