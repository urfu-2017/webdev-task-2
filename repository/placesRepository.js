'use strict';

let placesStorage = [];
const Place = require('../models/place');

const generateID = () => {
    return Math.round(Date.now() / ((placesStorage.length + 1) *
        Math.round(Math.random() * 1000000)));
};

module.exports.addPlace = function addPlace(name) {
    const id = generateID();
    let places = new Place(id, name);
    placesStorage.push(places);

    return places;
};

module.exports.getPlaces = function getPlaces(searchText, sortBy, page, limit) {
    let result = placesStorage;
    let defaultPageLimit = 5;
    result = search(searchText, result);
    if (sortBy) {
        result = sortPlaces(result, sortBy);
    }
    if (limit && isFinite(limit)) {
        defaultPageLimit = Number(limit);
    }
    if (page && isFinite(page)) {
        result = result.slice(0 + page * defaultPageLimit,
            defaultPageLimit + page * defaultPageLimit);
    }

    return result;
};

function search(text, array) {
    if (text) {
        array = array.filter(
            place => searchInName(place.name, text)
        );
    }

    return array;
}

module.exports.clearAll = function clearAll() {
    placesStorage = [];

    return true;
};

module.exports.deletePlace = function deletePlace(id) {
    const place = findById(id);

    if (place === undefined) {
        return false;
    }

    const placeIndex = placesStorage.indexOf(place);
    placesStorage.splice(placeIndex, 1);

    return true;
};

module.exports.updatePlace = function updatePlace(id, name, isVisited) {
    const place = findById(id);

    if (place === undefined) {
        return false;
    }
    if (name !== undefined) {
        place.name = name;
    }
    if (typeof (isVisited) === 'boolean') {
        place.isVisited = isVisited;
    }

    return place;
};

module.exports.swapPlace = function swapPlace(id, position) {
    const place = findById(Number(id));
    if (place === undefined) {

        return false;
    }
    placesStorage.splice(placesStorage.indexOf(place), 1);
    placesStorage.splice(position, 0, place);

    return true;
};

function findById(id) {
    return placesStorage.find(p => p.id === id);
}

function sortPlaces(places, sortBy) {
    const { direction, by } = sortBy;
    let dirMult = (direction === 'desc') ? -1 : 1;

    if (by === 'name') {
        return places.sort((a, b) => (a.name > b.name ? 1 : -1) * dirMult);
    }
    if (by === 'date') {
        return places.sort((a, b) => (a.dateCreate - b.dateCreate) * dirMult);
    }

    return places;
}

function searchInName(description, searchString) {
    const words = searchString.split(' ');
    const searchIn = description.split(' ').map(word => word.toLowerCase());

    return words.some(word => searchIn.includes(word));
}
