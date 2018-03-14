'use strict';

const { PlaceManager } = require('../models/place');

function create(req, res) {
    res.send(PlaceManager.create(req.body.description));
}

function list(req, res) {
    let places = PlaceManager.all();

    if (req.query.query) {
        places = PlaceManager.filterByQuery(places, req.query.query);
    }

    res.send(places);
}

function retrieve(req, res) {
    res.send(req.place);
}

function update(req, res) {
    const {
        description = req.place.description,
        isVisited = req.place.isVisited
    } = req.body;
    PlaceManager.update(req.place, { description, isVisited });

    res.send(req.place);
}

function remove(req, res) {
    res.send(PlaceManager.remove(req.place));
}

function clear(req, res) {
    PlaceManager.clear();
    res.end();
}

function reorder(req, res) {
    res.send(PlaceManager.reorder(req.body));
}

module.exports = {
    create,
    list,
    retrieve,
    update,
    remove,
    clear,
    reorder
};
