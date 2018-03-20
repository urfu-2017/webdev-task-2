'use strict';
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const place = require('../controllers/place');
const placesList = require('../controllers/places-list');
const { findPlaceMiddleware } = require('../middlewares/utils');
const { jsonOnly } = require('../controllers/errors');


router.route('/')
    .get(placesList.validators.getAll, placesList.getAll)
    .post(jsonOnly, place.create)
    .delete(placesList.clear);


router.route('/:id')
    .all(findPlaceMiddleware)

    .get(place.get)
    .patch(jsonOnly, place.update)
    .delete(place.remove);

router.route('/:id/move')
    .post(findPlaceMiddleware, jsonOnly, place.validators.move, place.move);

module.exports = router;
