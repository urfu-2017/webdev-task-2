'use strict';

const { ERRORS, STATUS_CODES } = require('../data.json');
const ServerError = require('../utils/server-error');

let places = [];
let count = 0;

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

    static create(description) {
        if (!description) {
            throw new ServerError(ERRORS.NO_DESCRIPTION, STATUS_CODES.BAD_REQUEST);
        }
        if (typeof description !== 'string') {
            throw new ServerError(ERRORS.DESCRIPTION_NOT_STRING, STATUS_CODES.BAD_REQUEST);
        }

        return new Place(description).save();
    }

    static find(sort, page = 0, limit, options = {}) {
        let placesCopy = places;
        Object.keys(options).forEach(key => {
            if (typeof options[key] === 'string') {
                placesCopy = placesCopy.filter(i => i[key].includes(options[key]));
            } else {
                placesCopy = placesCopy.filter(i => i[key] === options[key]);
            }
        });
        placesCopy = placesCopy.sort(sortFunc(sort));

        return limit ? placesCopy.slice(page * limit, (page + 1) * limit) : placesCopy;
    }

    static findById(id) {
        const place = places.find(i => i.id === id);
        if (!place) {
            throw new ServerError(ERRORS.ID_NOT_EXIST, STATUS_CODES.NOT_FOUND);
        }

        return place;
    }

    static removeById(id) {
        const place = Place.findById(id);
        places = places.filter(i => i.id !== id);

        return place;
    }

    static clear() {
        places = [];

        return [];
    }

    static change(place, key, value) {
        if (place && key !== undefined && value !== undefined) {
            place[key] = value;
        }
    }

    static replace({ id, description, visited }) {
        const place = Place.findById(id);
        Place.change(place, 'description', description);
        Place.change(place, 'visited', visited);

        return place;
    }

    static swap(id1, id2) {
        if (id2 >= count) {
            throw new ServerError(ERRORS.ID_NOT_CREATED, STATUS_CODES.INCORRECT_ENTITY);
        }
        const place1 = Place.findById(id1);
        const place2 = places.find(i => i.id === id2);
        Place.change(place1, 'id', id2);
        Place.change(place2, 'id', id1);

        return place1;
    }

    static visit(id) {
        const place = Place.findById(id);
        place.visited = true;

        return place;
    }

};
