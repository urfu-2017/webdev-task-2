'use strict';
const express = require('express');
const locationController = require('./location');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/locations', locationController.findAll);
router.post('/locations', locationController.add);
router.patch('/locations/:id', locationController.update);
router.put('/locations/order', locationController.changeOrder);
router.delete('/locations/:id', locationController.delete);
router.delete('/locations', locationController.reset);

module.exports = router;
