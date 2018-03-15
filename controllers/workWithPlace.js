'use strict';

const Place = require('../models/place');

// Возможность поиска места по его описанию
// Возможность редактирования описания конкретного места
// Возможность отметить место посещённым или непосещённым

exports.findPlace = (req, res) => {
    const description = req.params.name;
    const place = Place.findPlace(description);
    if (place) {
        res.json({ place }); // OK
    } else {
        res.sendStatus(404); // Not Found
    }
};

exports.edit = (req, res) => {
    const name = req.params.name;
    // const newDescription = req.params.newDescription;
    const isSet = Place.setDescription(name);
    if (isSet) {
        res.sendStatus(200); // OK
    } else {
        res.sendStatus(400); // Bad request
    }
};

exports.visit = (req, res) => {
    const name = req.params.name;
    const isVisit = Place.visit(name);
    if (isVisit) {
        res.sendStatus(200); // OK
    } else {
        res.sendStatus(404); // Not Found
    }
};
