'use strict';

const ASC_VALUE = 'asc';
const DESC_VALUE = 'desc';
const { descendingSort } = require('./arrayHelper');

exports.getPlacesByDescription = (allPlaces, description) => {
    if (description !== undefined) {
        return allPlaces.filter(place =>
            place.description.includes(description));
    }

    return allPlaces;
};

exports.getPlacesSortByQuery = (allPlaces, queryParams) => {
    let places = JSON.parse(JSON.stringify(allPlaces));
    if (queryParams.dateSort !== undefined) {
        places = sortByDate(places, queryParams.dateSort);
    }

    if (queryParams.alphabeticalSort !== undefined) {
        places = sortAlphabetically(places, queryParams.alphabeticalSort);
    }

    return places;
};

function sortByDate(places, sortValue) {
    if (sortValue === DESC_VALUE) {
        return places.sort((firstPlace, secondPlace) =>
            descendingSort(firstPlace.creationAtUTC, secondPlace.creationAtUTC));
    }
    if (sortValue === ASC_VALUE) {
        return places.sort((firstPlace, secondPlace) =>
            !descendingSort(firstPlace.creationAtUTC, secondPlace.creationAtUTC));
    }

    return places;
}

function sortAlphabetically(places, sortValue) {
    if (sortValue === DESC_VALUE) {
        return places.sort((firstPlace, secondPlace) =>
            descendingSort(firstPlace.name, secondPlace.name));
    }
    if (sortValue === ASC_VALUE) {
        return places.sort((firstPlace, secondPlace) =>
            !descendingSort(firstPlace.name, secondPlace.name));
    }

    return places;
}
