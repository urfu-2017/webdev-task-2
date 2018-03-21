'use strict';

const Place = require('../models/place');
const ServerError = require('../errors/serverError');
const errorMessages = require('../errors/errorMessages');

exports.create = (req, res) => {
    const place = new Place(req.body);
    place.save();
    res.status(201).send(place);
};


exports.getAll = (req, res, next) => {
    const { name, visited, sortBy, order, from, to } = req.query;
    const places = Place.getAll({ name, visited, from: Number(from), to: Number(to) },
        { sortBy, order }
    );
    if (!places) {
        next(new ServerError(errorMessages.INVALID_INPUT_PARAMETERS, 400));
    }
    res.status(200).send(places);
};

exports.get = (req, res, next) => {
    const { id } = req.params;
    const place = Place.get(Number(id));
    if (!place) {
        return next(new ServerError(errorMessages.PLACE_NOT_FOUND, 400));
    }
    res.status(200).send(place);
};

exports.edit = (req, res, next) => {
    const { name } = req.body;
    const { id } = req.params;
    const place = Place.edit(Number(id), { name });
    if (!place) {
        return next(new ServerError(errorMessages.PLACE_NOT_FOUND, 400));
    }
    res.status(200).send(place);
};

exports.visit = (req, res, next) => {
    let { id, isVisited } = req.params;
    const place = Place.edit(Number(id), { visited: isVisited !== 'false' });
    if (!place) {
        return next(new ServerError(errorMessages.PLACE_NOT_FOUND, 400));
    }
    res.status(200).send(place);
};

exports.delete = (req, res, next) => {
    const { id } = req.params;
    const result = Place.remove(Number(id));
    if (!result) {
        return next(new ServerError(errorMessages.PLACE_NOT_FOUND, 400));
    }
    res.sendStatus(200);
};

exports.swap = (req, res, next) => {
    const result = Place.swap(Number(req.params.index1), Number(req.params.index2));
    if (!result) {
        return next(new ServerError(errorMessages.PLACE_NOT_FOUND, 400));
    }
    res.sendStatus(200);
};

exports.clear = (req, res) => {
    Place.clearList();
    res.sendStatus(200);
};
