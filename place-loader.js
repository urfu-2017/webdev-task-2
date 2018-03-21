'use strict';

const Place = require('./models/place');

exports.loadPlaces = function () {
    try {
        const places = require('./storage/places');
        for (const place of places) {
            new Place(place).save();
        }
    } catch (error) {
        console.error(`Unable to load storage!\n${error.stack}\n`);
    }
};
