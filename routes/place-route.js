'use strict';

const express = require('express');

const places = require('../controllers/places');
const { error404 } = require('../controllers/errors');

const router = new express.Router();

router.get('/', places);
router.all('*', error404);

module.exports = router;
