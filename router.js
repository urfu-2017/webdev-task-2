'use strict';

const { Router } = require('express');
const bodyParser = require('body-parser');
const { create, list, getPage, searchPlaces,
    updatePlaceDescription, updatePlaceVisit,
    clearList, deletePlace, swap } = require('./controllers');

let router = new Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/places', create);
router.get('/places', list);
router.get('/places/pages/:page', getPage);
router.get('/places/search', searchPlaces);
router.patch('/places/:id', updatePlaceDescription);
router.post('/places/:id', updatePlaceVisit);
router.delete('/places', clearList);
router.delete('/places/:id', deletePlace);
router.put('/places/:id', swap);
router.all('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;
