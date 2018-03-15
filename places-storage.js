'use strict';

let places = [];

module.exports.addPlace = function addPlace(name, description) {
    const place = {
        'id': places.length,
        name, description,
        'visited': false,
        'creationDate': new Date()
    };
    places.push(place);

    return place;
};

module.exports.getPlaces = function getPlaces(searchString, sortBy, skip, take) {
    let result = places.slice(0, places.length);
    if (searchString) {
        result = result.filter(
            place => filterByDescription(place.description, searchString)
        );
    }
    if (sortBy) {
        result = sortPlaces(result, sortBy);
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

function sortPlaces(__places, sortBy) {
    const { direction, type } = sortBy;
    let directionMultiplier = 1;
    if (direction === 'desc') {
        directionMultiplier = -1;
    }
    if (type === 'alph') {
        return __places.sort((a, b) => a.name > b.name
            ? directionMultiplier
            : -1 * directionMultiplier);
    }
    if (type === 'date') {
        return __places.sort((a, b) => a.creationDate > b.creationDate
            ? directionMultiplier
            : -1 * directionMultiplier);
    }

    return __places;
}

function filterByDescription(description, searchString) {
    const words = searchString.split(' ');

    return words.some(word => description.split(' ').includes(word));
}

module.exports.removePlace = function removePlace(id) {
    const place = places.find(p => p.id === Number(id));
    const placeIndex = places.indexOf(place);
    places.splice(placeIndex, 1);

    return true;
};

module.exports.removeAllPlaces = function removeAllPlaces() {
    places = [];

    return true;
};

module.exports.editPlace = function editPlace(id, newInfo) {
    const place = places.find(p => p.id === Number(id));
    const { moveTo, description, visited } = newInfo;

    if (moveTo !== undefined) {
        const placeId = places.indexOf(place);
        places.splice(placeId, 1);
        places.splice(moveTo, 0, place);
    }
    if (description !== undefined) {
        place.description = description;
    }
    if (visited !== undefined) {
        place.visited = visited;
    }

    return true;
};
