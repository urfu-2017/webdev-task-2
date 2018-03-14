'use strict';

const express = require('express');
const placesController = require('../controllers/places');
const { placeRetriever } = require('../middlewares/place-validator');

const router = express.Router();

router.route('/')
    .get(placesController.list)
    .post(placesController.create)
    .patch(placesController.reorder)
    .delete(placesController.clear);

router.param('id', placeRetriever);
router.route('/:id')
    .get(placesController.retrieve)
    .patch(placesController.update)
    .delete(placesController.remove);

module.exports = router;
