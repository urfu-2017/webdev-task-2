'use strict';

const LocationStorage = require('../models/LocationStorage');
const storage = new LocationStorage();

module.exports.createPlace = req => {
    if (storage.has(req.place)) {
        return { code: 409, message: 'Conflict, already exists. Use put if needed to update.' };
    }
    const date = new Date();
    storage.push({
        name: req.place, description: req.description || '',
        visited: false, timeCreated: date
    });

    return { code: 201, message: 'Created' };
};

const sortBy = (array, param) => {
    switch (param) {
        case 'timeCreated':
            return array.sort((a, b) => a.timeCreated - b.timeCreated);
        case 'name':
            return array.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return [];
    }
};

// const getInfo = array => array.map(elem => ({
//     name: elem.name,
//     visited: elem.visited, description: elem.description
// }));


module.exports.getPlaces = req => {
    let data = storage.get();
    if (req.sortBy) {
        data = sortBy(data, req.sortBy);
    }
    if (!data) {
        return { code: 400, message: 'Bad request' };
    }

    return { code: 200, message: 'Ok', body: data };
};

module.exports.getPlacesByDescr = req => {
    const data = storage.get('description', req.findByDescr);
    if (data.length) {
        return { code: 200, message: 'Ok', body: data };
    }

    return { code: 400, message: 'Bad request' };
};

module.exports.updatePlace = req => {
    if (storage.update(req.place, req.param, req.value)) {
        return { code: 200, message: 'Ok' };
    }

    return { code: 400, message: 'Bad request' };
};

module.exports.swapPlaces = req => {
    if (storage.swap(req.place1, req.place2)) {
        return { code: 200, message: 'Ok' };
    }

    return { code: 400, message: 'Bad request' };
};

module.exports.deletePlace = req => {
    if (req.place === 'all') {
        storage.delete();

        return { code: 200, message: 'Ok' };
    }
    if (storage.delete(req.place)) {
        return { code: 200, message: 'Ok' };
    }

    return { code: 400, message: 'Bad request' };
};
