'use strict';

let places = [];
let currentPlaceIndex = 0;

module.exports.addPlace = function addPlace(name) {
    if (!name) {
        return undefined;
    }
    const place = {
        id: currentPlaceIndex++,
        name,
        visited: false,
        creationDate: new Date()
    };
    places.push(place);

    return place;
};

module.exports.getPlaces = function getPlaces({ searchString, sort, skip, take }) {
    let result = places.slice();
    if (searchString) {
        result = result.filter(place => place.name.includes(searchString));
    }
    if (sort) {
        result = sortPlaces(result, sort);
    }
    if (isNaN(skip)) {
        skip = 0;
    }
    if (!isNaN(take)) {
        result = result.slice(skip, skip + take);
    } else {
        result = result.slice(skip);
    }

    return result;
};

function sortPlaces(__places, sort) {
    const { direction, type } = sort;
    let directionMultiplier = 1;
    if (direction === 'desc') {
        directionMultiplier = -1;
    }
    if (type === 'alph') {
        return __places.sort((a, b) => (a.name > b.name ? 1 : -1) * directionMultiplier);
    }
    if (type === 'date') {
        return __places.sort((a, b) => (a.creationDate - b.creationDate) * directionMultiplier);
    }

    return __places;
}

module.exports.removePlace = function removePlace(id) {
    const place = places.find(p => p.id === Number(id));
    if (place === undefined) {
        return false;
    }
    const placeIndex = places.indexOf(place);
    places.splice(placeIndex, 1);

    return true;
};

module.exports.removeAllPlaces = function removeAllPlaces() {
    places = [];

    return true;
};

module.exports.editPlace = function editPlace(id, info) {
    const placeId = places.findIndex(p => p.id === id);
    const place = places[placeId];
    if (placeId === -1) {
        return undefined;
    }
    const { moveTo, name, visited } = info;
    if (moveTo !== undefined) {
        places.splice(placeId, 1);
        places.splice(moveTo, 0, place);
    }
    if (name !== undefined) {
        place.name = name;
    }
    if (visited !== undefined) {
        place.visited = visited;
    }

    return place;
};
