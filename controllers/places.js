'use strict';

const PlaceModel = require('../models/places');

exports.getAll = async (req, res, next) => {
    try {
        let { sort, limit = 5, page } = req.query;
        limit = Number(limit);
        page = Number(page);

        const places = await PlaceModel.getAll({ sort, limit, page });

        res.status(200).send(places);
    } catch (error) {
        next(new Error('CANNOT_GET_DATA'));
    }
};

exports.create = async (req, res, next) => {
    try {
        const { description } = req.body;

        const createdPlace = await PlaceModel.add(description);

        res.status(201).send(createdPlace);
    } catch (error) {
        next(new Error('CANNOT_ADD_PLACE'));
    }
};

exports.update = async (req, res, next) => {
    try {
        const { description, visited } = req.body;
        const id = Number(req.params.id);

        const updatedPlace = await PlaceModel.update({ description, visited, id });

        if (!updatedPlace) {
            res.sendStatus(400);
        }

        res.status(200).send(updatedPlace);
    } catch (error) {
        next(new Error('CANNOT_UPDATE_PLACE'));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const deletedPlace = await PlaceModel.delete(id);

        if (!deletedPlace) {
            res.sendStatus(400);
        }

        res.status(200).send(deletedPlace);
    } catch (error) {
        next(new Error('CANNOT_DELETE_PLACE'));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        await PlaceModel.deleteAll();

        res.sendStatus(200);
    } catch (error) {
        next(new Error('CANNOT_DELETE_ALL'));
    }
};

exports.search = async (req, res, next) => {
    try {
        const { q } = req.query;

        const places = await PlaceModel.search(q);

        res.status(200).send(places);
    } catch (error) {
        next(new Error('CANNOT_SEARCH'));
    }
};
