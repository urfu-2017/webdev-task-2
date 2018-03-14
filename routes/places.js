'use strict';
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const place = require('../controllers/place');
const placesList = require('../controllers/places-list');
const { jsonOnly } = require('../controllers/errors');


router.route('/')
    .get(placesList.validators.getAll, placesList.getAll)
    .post(jsonOnly, place.create)
    .delete(placesList.clear);


router.route('/:id')
    .all(place.validateId)

    .get(place.get)
    .patch(jsonOnly, place.update)
    .delete(place.remove);

router.route('/:id/move')
    .post(place.validateId, jsonOnly, place.validators.move, place.move);

module.exports = router;
