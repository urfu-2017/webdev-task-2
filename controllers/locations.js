'use strict';

const arr = [];

const alreadyExists = place => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === place) {
            return true;
        }
    }

    return false;
};

module.exports.createPlace = function createPlace(req) {
    if (alreadyExists(req.place)) {
        return { code: 409, message: 'Conflict, already exists. Use put if needed to update.' };
    }
    const date = new Date();
    arr.push({
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

const getInfo = array => array.map(elem => ({
    name: elem.name,
    visited: elem.visited, description: elem.description
}));


module.exports.getPlaces = function getPlaces(req) {
    let data = arr;
    if (req.sortBy) {
        data = sortBy(data, req.sortBy);
    }
    if (!data) {
        return { code: 400, message: 'Bad request' };
    }

    return { code: 200, message: 'Ok', body: getInfo(data) };
};

module.exports.getPlacesByDescr = function getPlacesByDescr(req) {
    const data = [];
    arr.forEach(elem => {
        if (elem.description.includes(req.findByDescr)) {
            data.push(elem);
        }
    });
    if (data.length) {
        return { code: 200, message: 'Ok', body: getInfo(data) };
    }

    return { code: 400, message: 'Bad request' };
};

module.exports.updatePlace = function updatePlace(req) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === req.place) {
            arr[i][req.param] = req.value;

            return { code: 200, message: 'Ok' };
        }
    }

    return { code: 400, message: 'Bad request' };
};

module.exports.swapPlaces = function swapPlaces(req) {
    console.info(req);
    let firstIdx = -1;
    let secondIdx = -1;
    arr.forEach((elem, idx) => {
        if (elem.name === req.place1) {
            firstIdx = idx;
        } else if (elem.name === req.place2) {
            secondIdx = idx;
        }
    });
    if (firstIdx !== -1 && secondIdx !== -1) {
        const temp = arr[firstIdx];
        arr[firstIdx] = arr[secondIdx];
        arr[secondIdx] = temp;

        return { code: 200, message: 'Ok' };
    }

    return { code: 400, message: 'Bad request' };
};

module.exports.deletePlace = function deletePlace(req) {
    if (req.place === 'all') {
        arr.splice(0, arr.length);

        return { code: 200, message: 'Ok' };
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === req.place) {
            arr[i][req.param] = req.value;
            arr.splice(i, 1);

            return { code: 200, message: 'Ok' };
        }
    }

    return { code: 400, message: 'Bad request' };
};
