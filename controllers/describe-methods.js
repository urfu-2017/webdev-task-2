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
    place.create();
    res.status(201).send(place); // Created
};

// Возможность удаления места
exports.deletePlace = (req, res) => {
    const isDelete = Place.deletePlace(req.params.id);
    if (isDelete) {
        res.sendStatus(202);
    }
    res.sendStatus(404);
};

// Возможность редактирования описания конкретного места
exports.edit = (req, res) => {
    const editableField = req.query.name ? 'name' : 'description';
    const { placeWithNewValue, isEdit } = Place.edit(
        req.params.id,
        req.query.newValue,
        editableField);
    if (isEdit) {
        res.status(200).send(placeWithNewValue); // OK
    } else {
        res.sendStatus(404); // Bad request
    }
};

// Возможность поиска места по его описанию
exports.findPlace = (req, res) => {
    const places = Place.findPlace(req.query.value, req.query.searchType);
    res.status(200).send(places); // OK
};

// Возможность получения списка мест
//   Можно сортировать по дате создания
//   Можно сортировать по алфавиту
//   Можно выводить список мест постранично
exports.list = (req, res) => {
    const places = Place.list(req.query.sortType);
    // console.log(places);
    res.type('application/json');
    res.status(200);
    res.send(places);
};

exports.pagination = (req, res) => {
    const arrPages = Place.pagination(req.query.numberForPages);
    res.status(200).send(arrPages);
};

// Возможность менять порядок мест в списке
exports.swap = (req, res) => {
    const places = Place.swap(req.query.id1, req.query.id2);
    if (places.length) {
        res.status(200).send(places);
    } else {
        res.sendStatus(404);
    }
};

// Возможность отметить место посещённым или непосещённым
exports.visit = (req, res) => {
    const id = Number(req.params.id);
    const method = Object.keys(req.route.methods)[0];
    let isVisit = false;
    if (method === 'put') {
        isVisit = true;
    }
    const isCorrectMark = Place.visit(id, isVisit);
    if (isCorrectMark) {
        res.status(200); // OK
    } else {
        res.sendStatus(404); // Not Found
    }
};
