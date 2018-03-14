'use strict';

const { Router } = require('express');
const router = new Router();

const { root, id, visited } = require('../controllers/place');

router.use('/visited', visited.toController());
router.use('/:id', id.toController());
router.use('/', root.toController());

module.exports = router;
