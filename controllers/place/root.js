'use strict';

const Place = require('../../models/place');

module.exports = {
    url: '/',
    get: (req, res) => res.json(Place.find(req.query.description, req.query.sort,
        parseInt(req.query.page), parseInt(req.query.limit))),
    post: (req, res) => res.json(new Place(req.body.description).save()),
    put: (req, res) => res.json(Place.replace(req.body)),
    delete: (req, res) => res.json(Place.clear())
};
