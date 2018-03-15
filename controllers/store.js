'use strict';

const Store = require('../models/store');
const Place = require('../models/place');
let store = new Store();

module.exports = class StoreControl {
    static listPlaces(req, res) {
        let sortMethod = req.body.sort;
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
    }

    static addPlace(req, res) {
        store.add(new Place(req.body.desc));
        res.json(store.store);
    }

    static clearStore(req, res) {
        store.clear();
        res.json(store.store);
    }

    static deletePlace(req, res) {
        store.delete(req.body.id);
        res.json(store.store);
    }

    static findPlace(req, res) {
        res.json(store.findDesc(req.body.desc));
    }

    static editPlace(req, res) {
        store.edit(req.body);
        res.json(store.store);
    }

    static insertPlace(req, res) {
        store.insert(req.body);
        res.json(store.store);
    }
};
