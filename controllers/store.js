'use strict';

const { Store } = require('../models/store');
const { Place } = require('../models/place');
let store = new Store();

exports.listPlaces = (req, res) => {
    let sortMethod = req.query.sort;
    switch (sortMethod) {
        case 'date':
            store.dateSort();
            break;
        case 'alphabet':
            store.alphabetSort();
            break;
        default:
            return res.json(store.store);
    }
    res.json(store.store);
};

exports.addPlace = (req, res) => {
    store.add(new Place(req.query.desc));
    res.json(store.store);
};

exports.clearStore = (req, res) => {
    store.clear();
    res.json(store.store);
};

exports.deletePlace = (req, res) => {
    store.delete(req.query.id);
    res.json(store.store);
};

exports.findPlace = (req, res) => {
    res.json(store.findDesc(req.query.desc));
};

exports.editPlace = (req, res) => {
    store.edit(req.query);
    res.json(store.store);
};

exports.insertPlace = (req, res) => {
    store.insert(req.query);
    res.json(store.store);
};
