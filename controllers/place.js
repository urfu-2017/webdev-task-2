'use strict';

const Place = require('../models/place');

module.exports = class PlaceController {
    static listPlaces(req, res) {
        res.json(Place.getStore(req.body.page, req.body.itemsCount, req.body.sort));
    }

    static addPlace(req, res) {
        Place.add(req.body.desc);
        res.json(Place.getStore());
    }

    static clearStore(req, res) {
        Place.clear();
        res.json(Place.getStore());
    }

    static deletePlace(req, res) {
        Place.delete(req.body.id);
        res.json(Place.getStore());
    }

    static findPlace(req, res) {
        if (req.body.desc && typeof(req.body.desc) === 'string') {
            res.status(400).send('Description is empty');
        }
        res.json(Place.findDesc(req.body.desc));
    }

    static editPlace(req, res) {
        Place.edit(req.body);
        res.json(Place.getStore());
    }

    static insertPlace(req, res) {
        Place.insert(req.body);
        res.json(Place.getStore());
    }
};
