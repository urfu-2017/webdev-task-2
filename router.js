'use strict';

const { Router } = require('express');
const bodyParser = require('body-parser');
const { createPlace, list, getPage, searchPlaces,
    update, clearList, deletePlace, swap } = require('./controllers/index');

let router = new Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/places', createPlace);
router.get('/places', list);
router.get('/places/pages/:page', getPage);
router.get('/places/search', searchPlaces);
router.patch('/places/:id', update);
router.delete('/places', clearList);
router.delete('/places/:id', deletePlace);
router.put('/places/:id', swap);
router.all('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;
