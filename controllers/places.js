'use strict';

const Place = require('../models/place');

exports.create = (req, res) => {
    const { name, descr } = req.body;
    const place = Place.create(name, descr);
    res.status(201).json(place);
};

exports.listByDefault = (req, res) => {
    const places = Place.listByDefault();
    res.status(200).json(places);
};

exports.listByCreatedAt = (req, res) => {
    const places = Place.listByCreatedAt();
    res.status(200).json(places);
};

exports.listByAlphabet = (req, res) => {
    const places = Place.listByAlphabet();
    res.status(200).json(places);
};

exports.listPaginal = (req, res) => {
    const page = Place.listPaginal(Number(req.params.pageNumber), Number(req.params.pageSize));
    res.status(200).json(page);
};

exports.findByDescr = (req, res) => {
    const place = Place.findByDescr(req.query.descr);
    if (place === undefined) {
        res.sendStatus(404);
    } else {
        res.status(200).json(place);
    }
};

exports.editDescr = (req, res) => {
    const place = Place.editDescr(Number(req.params.id), req.query.newDescr);
    if (place === -1) {
        res.sendStatus(204);
    } else {
        res.status(200).json(place);
    }
};

exports.editVisited = (req, res) => {
    const place = Place.editVisited(Number(req.params.id), req.query.visited);
    if (place === -1) {
        res.sendStatus(204);
    } else {
        res.status(200).json(place);
    }
};

exports.deleteById = (req, res) => {
    const deleted = Place.deleteById(Number(req.params.id));
    if (deleted) {
        res.status(200).json(deleted);
    } else {
        res.sendStatus(204);
    }
};

exports.changeOrder = (req, res) => {
    const success = Place.changeOrder(Number(req.params.id), req.params.position);
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
