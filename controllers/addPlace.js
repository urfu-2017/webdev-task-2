'use strict';
const Place = require('../models/place');

exports.addPlace = (req, res) =>{
    var { description } = req.body;
    var place = new Place (description);
    place.save();
    res.sendStatus(201);
};
