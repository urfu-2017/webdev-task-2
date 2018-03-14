'use strict';

const { ERRORS } = require('../data.json');
const ServerError = require('../utils/server-error');

let places = [];
let count = 0;

const compareByIntField = field => (i, j) => Number(i[field]) - Number(j[field]);
const compareByStrField = field => (i, j) => i[field].localeCompare(j[field]);

const sortFunc = sort => {
    const sortFuncs = {
        'date': compareByIntField('created'),
        'desc': compareByStrField('description'),
        'id': compareByIntField('id')
    };

    return sortFuncs[sort] ? sortFuncs[sort] : sortFuncs.id;
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
            throw new ServerError(ERRORS.NO_DESCRIPTION);
        }
        if (typeof description !== 'string') {
            throw new ServerError(ERRORS.DESCRIPTION_NOT_STRING);
        }

        return new Place(description).save();
    }

    static find(query, { page = 0, limit, sort }) {
        let placesCopy = places;
        Object.keys(query).forEach(key => {
            if (typeof query[key] === 'string') {
                placesCopy = placesCopy.filter(i => i[key].includes(query[key]));
            } else {
                placesCopy = placesCopy.filter(i => i[key] === query[key]);
            }
        });
        placesCopy = placesCopy.sort(sortFunc(sort));

        return limit ? placesCopy.slice(page * limit, (page + 1) * limit) : placesCopy;
    }

    static findById(id) {
        const place = places.find(i => i.id === id);
        if (!place) {
            throw new ServerError(ERRORS.ID_NOT_EXIST);
        }

        return place;
    }

    static removeById(id) {
        const place = Place.findById(id);
        places = places.filter(i => i.id !== id);

        return place;
    }

    static removeAll() {
        places = [];
        count = 0;

        return [];
    }

    static updateById(id, fields) {
        const place = Place.findById(id);
        Object.keys(fields).forEach(field => {
            if (field !== undefined && fields[field] !== undefined) {
                place[field] = fields[field];
            }
        });

        return place;
    }

    static swap(id1, id2) {
        if (id2 >= count) {
            throw new ServerError(ERRORS.ID_NOT_CREATED);
        }
        const place = Place.updateById(id1, { id: id2 });
        try {
            Place.updateById(id2, { id: id1 });
        } catch (e) {
            return place;
        }

        return place;
    }

    static visit(id) {
        const place = Place.findById(id);
        place.visited = true;

        return place;
    }
};
