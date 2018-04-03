'use strict';
const Place = require('../models/place');

exports.getPlace = (req, res) =>{
    res.send(JSON.stringify(Place.getList(req.query)));
};
