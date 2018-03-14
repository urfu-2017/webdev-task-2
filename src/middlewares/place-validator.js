'use strict';

const messages = require('../assets/messages');
const exceptions = require('../utils/exceptions');
const { PlaceManager } = require('../models/place');

function placeRetriever(req, res, next, id) {
    const placeId = Number(id);
    if (placeId === 0 || isNaN(placeId)) {
        throw new exceptions.ObjectNotFound(messages.placeNotFound);
    }

    req.place = PlaceManager.get(placeId);
    next();
}

module.exports = { placeRetriever };
