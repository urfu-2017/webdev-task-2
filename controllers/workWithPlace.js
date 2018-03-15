'use strict';

const Place = require('../models/place');

// Возможность поиска места по его описанию
exports.findPlace = (req, res) => {
    const description = req.params.name;
    const place = Place.findPlace(description);
    if (place) {
        res.json({ place }); // OK
    } else {
        res.sendStatus(404); // Not Found
    }
};

// Возможность редактирования описания конкретного места
exports.edit = (req, res) => {
    const name = req.params.name;
    const newDescription = req.query.newDescription;
    const isSet = Place.setDescription(newDescription, name);
    if (isSet) {
        res.sendStatus(200); // OK
    } else {
        res.sendStatus(400); // Bad request
    }
};

// Возможность отметить место посещённым или непосещённым
exports.visit = (req, res) => {
    const name = req.params.name;
    const isVisit = Place.visit(name);
    if (isVisit) {
        res.sendStatus(200); // OK
    } else {
        res.sendStatus(404); // Not Found
    }
};

// Возможность удаления места
exports.deletePlace = (req, res) => {
    const name = req.params.name;
    const isDelete = Place.popPlace(name);
    if (isDelete) {
        res.sendStatus(202); // Accepted
    } else {
        res.sendStatus(404); // Not Found
    }
};
