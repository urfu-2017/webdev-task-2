'use strict';

const Place = require('../models/place');

module.exports = class PlaceController {
    static listPlaces(req, res) {
        const { pageNumber, pageSize, sort } = req.body;
        res.json(Place.getList(pageNumber, pageSize, sort));
    }

    static addPlace(req, res) {
        const desc = req.body.desc;
        if (desc && typeof (desc) === 'string') {
            Place.add(desc);
            res.send('OK');

            return;
        }
        res.status(400).send('Description is empty');
    }

    static clear(res) {
        Place.clear();
        res.send('OK');
    }

    static deletePlace(req, res) {
        const id = req.body.id;
        if (id) {
            Place.delete(id);
            res.send('OK');

            return;
        }
        res.status(400).send('Id is empty');
    }

    static findPlace(req, res) {
        const desc = req.body.desc;
        if (desc && typeof (desc) === 'string') {
            res.json(Place.findDesc(desc));

            return;
        }
        res.status(400).send('Description is empty');
    }

    static editPlace(req, res) {
        const { id, desc, isVisited } = req.body;
        if (req.body.id) {
            Place.edit(id, desc, isVisited);
            res.send('OK');

            return;
        }
        res.status(400).send('Id is empty');
    }

    static insertPlace(req, res) {
        const { id, indexTo } = req.body;
        if (req.body.id) {
            Place.insert(id, indexTo);
            res.send('OK');

            return;
        }
        res.status(400).send('Id is empty');
    }
};
