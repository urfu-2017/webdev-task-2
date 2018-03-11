'use strict';

const { Router } = require('express');
const router = new Router();

const { root, id } = require('../controllers/place');

router.use('/:id', id.toController());
router.use('/', root.toController());

module.exports = router;
