'use strict';

const { Storage } = require('../models/places');
const OK_RESPONSE = { ok: true };
const ERROR_RESPONSE = { ok: false };

exports.createPlace = (req, res) => {
    const storage = new Storage();
    const query = req.body;
    const id = storage.add(query.description);

    res.status(201).json({ ...OK_RESPONSE, id });
};

exports.listPlaces = (req, res) => {
    const storage = new Storage();
    const sortParameter = req.query.sort;
    const places = storage.list(sortParameter);
    if (!places) {
        res.status(204);
    } else {
        res.json({ ...OK_RESPONSE, places });
    }
};

exports.listByPages = (req, res) => {
    const storage = new Storage();
    const sortParam = req.params.sort;
    const pageSize = Number(req.params.size);
    const pageNumber = Number(req.params.number);
    const places = storage.listByPages(sortParam, pageSize, pageNumber);
    if (!places) {
        res.sendStatus(204);
    }
    res.json({ ...OK_RESPONSE, places });
};

exports.findByDescription = (req, res) => {
    const storage = new Storage();
    const query = req.query.q;
    if (!query) {
        res.sendStatus(204);
    }
    const place = storage.searchByDescription(query);
    if (!place) {
        res.status(404).json(ERROR_RESPONSE);
    }
    res.json({ ...OK_RESPONSE, place });
};

exports.changeDescription = (req, res) => {
    const storage = new Storage();
    const id = Number(req.params.id);
    if (!req.body.description) {
        res.status(400).json(ERROR_RESPONSE);
    }
    try {
        storage.changeDescription(id, req.body.description);
        res.json(OK_RESPONSE);
    } catch (ex) {
        console.error(ex);
        res.status(404).json(ERROR_RESPONSE);
    }
};

exports.toggleVisited = (req, res) => {
    const storage = new Storage();
    const id = Number(req.params.id);
    if (!req.body.visited) {
        res.status(400).json(ERROR_RESPONSE);
    }
    try {
        storage.toggleVisited(id, Boolean(req.body.visited));
        res.json(OK_RESPONSE);
    } catch (ex) {
        console.error(ex);
        res.status(404).json(ERROR_RESPONSE);
    }
};

exports.deletePlace = (req, res) => {
    const storage = new Storage();
    const id = Number(req.params.id);
    try {
        storage.deletePlace(id);
        res.json(OK_RESPONSE);
    } catch (ex) {
        console.error(ex);
        res.status(404).json(ERROR_RESPONSE);
    }
};

exports.swap = (req, res) => {
    const storage = new Storage();
    const firstId = Number(req.params.id1);
    const secondId = Number(req.params.id2);
    try {
        const { newFirstId, newSecondId } = storage.swapPlaces(firstId, secondId);
        res.json({ ...OK_RESPONSE, firstId: newFirstId, secondId: newSecondId });
    } catch (ex) {
        console.error(ex);
        res.status(404).json(ERROR_RESPONSE);
    }
};

exports.deletePlaces = (req, res) => {
    const storage = new Storage();
    storage.clear();
    res.json(OK_RESPONSE);
};
