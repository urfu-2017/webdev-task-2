'use strict';

const Place = require('../models/place');
const PlacesRepository = require('../dataAccess/placesRepository');
const placesRepository = new PlacesRepository();
const pageSize = 1;

exports.getAll = async (req, res) => {
    let places = [];
    const page = req.query.page;
    if (page) {
        const skip = (page - 1) * pageSize;
        places = placesRepository.getAll(skip, pageSize);
    } else {
        places = placesRepository.getAll();
    }

    res.send(places);
};

exports.getPlace = async (req, res) => {
    const id = req.params.id;
    const descriptionQuery = req.query.description;
    let place = null;
    if (id) {
        place = placesRepository.get(id);
    } else if (descriptionQuery) {
        place = placesRepository.find(descriptionQuery);
    }

    res.send(place);
};

exports.createPlace = async (req, res) => {
    const placeDescription = req.body.description;
    const place = new Place({ id: -1,
        description: placeDescription,
        visited: false
    });
    const id = placesRepository.save(place);

    res.send({ id: id });
};

exports.updatePlace = async (req, res) => {
    const place = new Place(req.body);
    const order = req.params.order;
    const id = placesRepository.save(place, order);

    res.send({ id: id });
};

exports.deletePlace = async (req, res) => {
    const id = req.params.id;
    if (id) {
        placesRepository.delete(id);
    } else {
        placesRepository.deleteAll();
    }
    res.send(id);
};
