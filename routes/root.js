'use strict';

const { Router } = require('express');
const router = new Router();

const { root } = require('../controllers/root');

router.use('/', root.toController());

module.exports = router;
