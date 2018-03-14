'use strict';

const express = require('express');

const places = require('../controllers/places');

const router = new express.Router();

router.get('/', places.getAll);
router.get('/find', places.find);
router.post('/', places.create);
router.patch('/:id([0-9]+)', places.update);
router.delete('/', places.removeAll);
router.delete('/:id([0-9]+)', places.remove);

module.exports = router;
