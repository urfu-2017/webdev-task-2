'use strict';
const Place = require('../models/place');

exports.removePlaces = (req, res) =>{
    Place.removePlaces();
    res.sendStatus(200);
};
