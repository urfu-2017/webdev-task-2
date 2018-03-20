'use strict';

const store = require('../models/store');
const Place = require('../models/place');

module.exports = class PlaceController {
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
                return res.json(store.getStore(req.body.page, req.body.itemsCount));
        }
        res.json(store.getStore(req.body.page, req.body.itemsCount));
    }

    static addPlace(req, res) {
        store.add(new Place(req.body.desc));
        res.json(store.getStore());
    }

    static clearStore(req, res) {
        store.clear();
        res.json(store.getStore());
    }

    static deletePlace(req, res) {
        store.delete(req.body.id);
        res.json(store.getStore());
    }

    static findPlace(req, res) {
        if (req.body.desc && typeof(req.body.desc) === 'string') {
            res.status(400).send('Description is empty');
        }
        res.json(store.findDesc(req.body.desc));
    }

    static editPlace(req, res) {
        store.edit(req.body);
        res.json(store.getStore());
    }

    static insertPlace(req, res) {
        store.insert(req.body);
        res.json(store.getStore());
    }
};
