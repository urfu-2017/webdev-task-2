'use strict';

let placesStorage = [];
const Place = require('../models/place');

module.exports.addPlace = function addPlace(name) {
    const id = placesStorage.length;
    let places = new Place(id, name);
    placesStorage.push(places);

    return true;
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

function search(searchText, searchArr) {
    let result = searchArr;
    if (searchText) {
        result = searchArr = searchArr.filter(
            place => searchInDescription(place.name, searchText)
        );
    }

    return result;
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
    if (isVisited !== undefined) {
        if (isVisited === 'true') {
            place.isVisited = true;
        }
    }

    return true;
};

module.exports.swapPlace = function swapPlace(id, position) {
    const place = findById(id);
    if (position === undefined || !isNaN(position)) {
        return false;
    }
    const placeIndex = placesStorage.indexOf(place);
    placesStorage.splice(placeIndex, 1);
    placesStorage.splice(Number(position), 0, place);

    return true;
};

function findById(id) {
    return placesStorage.find(p => p.id === Number(id));
}

function sortPlaces(places, sortBy) {
    const { dir, by } = sortBy;
    let dirMult = (dir === 'desc') ? -1 : 1;

    if (by === 'name') {
        return places.sort((a, b) => a.name > b.name
            ? dirMult : -1 * dirMult);
    }
    if (by === 'date') {
        return places.sort((a, b) => a.dateCreate > b.dateCreate
            ? dirMult : -1 * dirMult);
    }

    return places;
}

function searchInDescription(description, searchString) {
    const words = searchString.split(' ');

    return words.some(word => description.split(' ').includes(word));
}
