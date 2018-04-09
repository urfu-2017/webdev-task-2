'use strict';

const Place = require('../models/place');
const PlacesRepository = require('../dataAccess/placesRepository');
const placesRepository = new PlacesRepository();
const pageSize = 1;

exports.getAll = async (req, res) => {
    let places = [];
    const page = req.query.page;
    const descriptionQuery = req.query.description;
    if (page) {
        const skip = (page - 1) * pageSize;
        places = placesRepository.getAll(skip, pageSize, descriptionQuery);
    } else {
        places = placesRepository.find(descriptionQuery);
    }

    res.send(places);
};

exports.getPlace = async (req, res) => {
    const id = req.params.id;
    let place = placesRepository.get(id);
    if (place === null) {
        res.status(404)
            .send('Not Found!');
    }

    res.send(place);
};

exports.createPlace = async (req, res) => {
    const placeDescription = req.body.description;
    const place = new Place({ description: placeDescription,
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
