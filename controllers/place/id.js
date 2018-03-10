'use strict';

const Place = require('../../models/place');

module.exports = {
    url: '/:id',
    get: (req, res) => res.json(Place.findById(req.params.id)),
    put: (req, res) => res.json(Place.swap(req.params.id, req.body.id)),
    delete: (req, res) => res.json(Place.findByIdAndRemove(req.params.id))
};
