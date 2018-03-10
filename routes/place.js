'use strict';

const { Router } = require('express');
const router = new Router();

const controller = require('../controllers/place');

router.get(controller.root.url, controller.root.get);
router.post(controller.root.url, controller.root.post);
router.put(controller.root.url, controller.root.put);
router.delete(controller.root.url, controller.root.delete);
router.get(controller.id.url, controller.id.get);
router.put(controller.id.url, controller.id.put);
router.delete(controller.id.url, controller.id.delete);

module.exports = router;
