'use strict';
const Place = require('../models/place');

exports.swapPlaces = (req, res) =>{

    res.send(JSON.stringify(Place.swap(req.query)));
};
