'use strict';

const PLACES_COUNT_PER_PAGE = 3;
const Place = require('../models/place');
const { chunkArrayInGroups } = require('../helpers/arrayHelper');
const { getPlacesSortByQuery, getPlacesByDescription } = require('../helpers/requestQueryHandler');


exports.getPlaces = (req, res) => {
    let queryParams = req.query;
    let places = Place.getAll();
    places = getPlacesByDescription(places, queryParams.description);
    places = getPlacesSortByQuery(places, queryParams);
    res.send(places);
};

exports.getPage = (req, res) => {
    let pageNumber = Number(req.params.pageNumber);
    let pages = chunkArrayInGroups(Place.getAll(), PLACES_COUNT_PER_PAGE);

    res.send(pages[--pageNumber]);
};

exports.createPlace = (req, res) => {
    const note = new Place(req.body);

    note.save();
    res.sendStatus(201);
};

exports.updatePlace = (req, res) => {
    let id = Number(req.params.id);
    let description = req.body.description;
    let isVisited = req.body.isVisited;

    if (Place.isContainPlace(id)) {
        Place.updateById(id, description, isVisited);
        res.send(Place.getAll());
    } else {
        res.sendStatus(404);
    }
};

exports.deletePlaces = (req, res) => {
    let id = Number(req.query.id);
    if (isNaN(id)) {
        Place.deleteAll();
    } else {
        Place.deleteById(id);
    }

    res.sendStatus(200);
};

exports.shuffle = (req, res) => {
    let firstId = Number(req.query.firstId);
    let secondId = Number(req.query.secondId);

    if (isNaN(firstId) || !Place.isContainPlace(firstId)) {
        res.sendStatus(404);
    }

    if (isNaN(secondId) || !Place.isContainPlace(secondId)) {
        res.sendStatus(404);
    }

    Place.shuffle(firstId, secondId);
    res.sendStatus(200);
};


