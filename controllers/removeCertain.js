'use strict';
const Place = require('../models/place');

exports.removeCertain = (req, res) =>{
    Place.removeCertain(req.params.id);
    res.sendStatus(200);
};
