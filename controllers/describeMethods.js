'use strict';

const Place = require('../models/place');

// Возможность очистки всего списка мест
exports.clearAll = (req, res) => {
    const places = Place.clearAll();
    res.status(200).send(places); // OK
};

// Возможность добавления нового места (страны, города, достопримечательности)
//   Место состоит из описания и отметки о посещении
//   Место создается непосещённым
exports.create = (req, res) => {
    // console.log(req.params);
    const place = new Place(req.params);
    const places = place.create();
    res.status(201).send(places); // Created
};

// Возможность удаления места
exports.deletePlace = (req, res) => {
    const places = Place.deletePlace(req.body.name);
    if (places.length) {
        res.status(202).send(places); // Accepted
    } else {
        res.sendStatus(404); // Not Found
    }
};

// Возможность редактирования описания конкретного места
exports.edit = (req, res) => {
    const places = Place.edit(req.body);
    if (places.length) {
        res.status(200).send(places); // OK
    } else {
        res.sendStatus(400); // Bad request
    }
};

// Возможность поиска места по его описанию
exports.findPlace = (req, res) => {
    const places = Place.findPlace(req.body);
    if (places.length) {
        res.status(200).send(places); // OK
    } else {
        res.sendStatus(404); // Not Found
    }
};

// Возможность получения списка мест
//   Можно сортировать по дате создания
//   Можно сортировать по алфавиту
//   Можно выводить список мест постранично
exports.list = (req, res) => {
    const places = Place.list(req.body.sortType);
    if (places.length) {
        res.status(200).send(places);
    } else {
        res.sendStatus(204); // No Content
    }
};

// Возможность менять порядок мест в списке
exports.swap = (req, res) => {
    const places = Place.swap(req.body);
    if (places.length) {
        res.status(200).send(places);
    } else {
        res.sendStatus(404);
    }
};

// Возможность отметить место посещённым или непосещённым
exports.visit = (req, res) => {
    const places = Place.visit(req.body.name);
    if (places.length) {
        res.status(200).send(places); // OK
    } else {
        res.sendStatus(404); // Not Found
    }
};
