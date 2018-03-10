'use strict';

// const { promiseError } = require('../utils');
// const { ERRORS } = require('../const');
const { ERRORS } = require('../data.json');

let places = [];
let count = 0;

const findPlace = id => places.find(i => i.id === id);
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
        const place = findPlace(id);

        return place ? place : { error: ERRORS.PLACE_WITH_THIS_ID_NOT_EXIST };
    }

    static findByIdAndRemove(id) {
        const place = findPlace(id);
        places = places.filter(i => i.id !== id);

        return place ? place : { error: ERRORS.PLACE_WITH_THIS_ID_NOT_EXIST };
    }

    static clear() {
        places = [];

        return [];
    }

    static replace({ id, description, visited }) {
        const place = places.find(i => i.id === id);
        if (!place) {
            return { error: ERRORS.PLACE_WITH_THIS_ID_NOT_EXIST };
        }
        changePlace(place, 'description', description);
        changePlace(place, 'visited', visited);

        return place;
    }

    static swap(id1, id2) {
        const place1 = findPlace(id1);
        const place2 = findPlace(id2);

        if (!place1) {
            return { error: ERRORS.PLACE_WITH_THIS_ID_NOT_EXIST };
        }
        changePlace(place1, 'id', id2);
        changePlace(place2, 'id', id1);

        return place1;
    }

};
