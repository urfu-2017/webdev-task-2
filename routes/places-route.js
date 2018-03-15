'use strict';

const express = require('express');

const places = require('../controllers/places');

const router = new express.Router();

router.get('/', places.getAll);
router.post('/', places.create);
router.delete('/', places.removeAll);
router.get('/find', places.find);
router.patch('/:id([0-9]+)', places.update);
router.delete('/:id([0-9]+)', places.remove);
router.put('/:id([0-9]+)/visited', places.visit);
router.put('/:id1([0-9]+)/swap/:id2([0-9]+)', places.swap);

module.exports = router;
