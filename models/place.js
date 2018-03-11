'use strict';

const { ERRORS } = require('../data.json');
const ServerError = require('../utils/server-error');

let places = [];
let count = 0;

const findPlace = id => places.find(i => i.id === id);
const findPlaceOrThrow = id => {
    const place = findPlace(id);
    if (!place) {
        throw new ServerError(ERRORS.PLACE_WITH_THIS_ID_NOT_EXIST);
    }

    return place;
};
const changePlace = (place, key, value) => {
    if (place && key !== undefined && value !== undefined) {
        place[key] = value;
    }
};

const sortFunc = sort => {
    switch (sort) {
        case 'date':
            return (i, j) => i.created.getTime() - j.created.getTime();
        case 'desc':
            return (i, j) => i.description >= j.description ? 1 : -1;
        default:
            return (i, j) => i.id - j.id;
    }
};

module.exports = class Place {
    constructor(description) {
        this.description = description;
    }

    save() {
        const place = {
            description: this.description,
            id: count,
            created: new Date(),
            visited: false
        };
        places.push(place);
        count++;

        return place;
    }

    static find(description = '', sort, page = 0, limit) {
        const placesCopy = places.filter(i => i.description.includes(description))
            .sort(sortFunc(sort));

        return limit ? placesCopy.slice(page * limit, (page + 1) * limit) : placesCopy;
    }

    static findById(id) {
        return findPlaceOrThrow(id);
    }

    static findByIdAndRemove(id) {
        const place = findPlaceOrThrow(id);
        places = places.filter(i => i.id !== id);

        return place;
    }

    static clear() {
        places = [];

        return [];
    }

    static replace({ id, description, visited }) {
        const place = findPlaceOrThrow(id);
        changePlace(place, 'description', description);
        changePlace(place, 'visited', visited);

        return place;
    }

    static swap(id1, id2) {
        if (id2 >= count) {
            throw new ServerError(ERRORS.ID_NOT_CREATED);
        }
        const place1 = findPlaceOrThrow(id1);
        const place2 = findPlace(id2);
        changePlace(place1, 'id', id2);
        changePlace(place2, 'id', id1);

        return place1;
    }

};
