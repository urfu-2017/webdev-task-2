'use strict';
const Place = require('../models/place');

exports.updateCertain = (req, res) =>{
    Place.updateCertain(req.params.id, req.body);
    res.sendStatus(200);
};
