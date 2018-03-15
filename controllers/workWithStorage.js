'use strict';

const Place = require('../models/place');

// Возможность добавления нового места (страны, города, достопримечательности)
//   Место состоит из описания и отметки о посещении
//   Место создается непосещённым
exports.create = (req, res) => {
    const place = new Place(req.query);
    place.insertPlace();
    res.sendStatus(201); // Created
};

// Возможность получения списка мест
//   Можно сортировать по дате создания
//   Можно сортировать по алфавиту
//   Можно выводить список мест постранично
exports.list = (req, res) => {
    const sortType = req.query.sortType;
    const places = Place.getPlacesList(sortType);
    if (places.length) {
        res.json({ places });
    } else {
        res.sendStatus(204); // No Content
    }
};

// Возможность менять порядок мест в списке
exports.swap = (req, res) => {
    const name = req.query.name;
    const position = req.query.position;
    const places = Place.switchOrder(name, position);
    if (places.length) {
        res.json({ places });
    } else {
        res.sendStatus(404);
    }
};

// Возможность очистки всего списка мест
exports.clear = (req, res) => {
    Place.clearAll();
    res.sendStatus(200); // OK
};
