'use strict';

const { Router } = require('express');
const router = new Router();

const controller = require('../controllers/root');

router.get(controller.root.url, controller.root.get);

module.exports = router;
