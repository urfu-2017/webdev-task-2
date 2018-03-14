'use strict';

const { Router } = require('express');
const router = new Router();

router.use('/places', require('./place'));
router.use('/', require('./root'));

module.exports = router;
