'use strict';

const Place = require('../../models/place');

module.exports = {
    url: '/:id',
    get: (req, res) => res.json(Place.findById(parseInt(req.params.id))),
    put: (req, res) => res.json(Place.swap(parseInt(req.params.id), parseInt(req.body.id))),
    delete: (req, res) => res.json(Place.findByIdAndRemove(parseInt(req.params.id)))
};
