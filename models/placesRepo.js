'use strict';
const Place = require('./place');

function isInt(data) {
    return data === parseInt(data, 10);
}

module.exports = class PlacesRepo {
    constructor() {
        this.places = [];
        this.nextId = 0;
    }

    add(placeDescription) {
        const place = new Place(this.nextId++, placeDescription);
        this.places.push(place);

        return place;
    }

    getAll() {
        return this.places;
    }

    getById(id) {
        if (!isInt(id)) {
            return null;
        }

        id = parseInt(id);

        return this.places.find(p => p.id === id);
    }

    update(id, description) {
        let place = this.getById(id);
        if (!place) {
            return false;
        }
        place.description = description;

        return place;
    }

    updateVisited(id) {
        let place = this.getById(id);
        if (!place) {
            return false;
        }
        place.visited = !place.visited;

        return place;
    }

    delete(id) {
        if (!this.getById(id)) {
            return false;
        }
        id = parseInt(id);
        this.places = this.places.filter(place => place.id !== id);

        return true;
    }

    deleteAll() {
        this.places = [];
        this.nextId = 0;
    }

    swap(id1, id2) {
        if (!isInt(id1) || !isInt(id2)) {
            return null;
        }

        id1 = parseInt(id1);
        id2 = parseInt(id2);
        const __ret = this.findIds(id1, id2);
        let i1 = __ret.i1;
        let i2 = __ret.i2;

        if (i1 <= 0 || i2 <= 0) {
            return false;
        }
        const tmp = this.places[i1];
        this.places[i1] = this.places[i2];
        this.places[i2] = tmp;

        return true;
    }

    findIds(id1, id2) {
        let i1 = -1;
        let i2 = -1;
        for (let i = 0; i < this.places.length; i++) {
            if (this.places[i].id === id1) {
                i1 = i;
            }
            if (this.places[i].id === id2) {
                i2 = i;
            }
        }

        return { i1, i2 };
    }

    getOrdered(comparator) {
        return this.places.slice(0).sort(comparator);
    }

    getByDescription(description) {
        return this.places.find(p => p.description === description);
    }

    getPage(start, limit) {
        return this.places.slice(start, start + limit);
    }
};
