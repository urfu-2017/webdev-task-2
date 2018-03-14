'use strict';

let idCounter = 0;
const storage = [];

class Place {
    constructor(description) {
        this.id = -1;
        this.description = description;
        this.creationTime = Date.now();
        this.visited = false;
    }

    save() {
        this.id = idCounter++;

        storage.push(this);
    }

    remove() {
        const index = storage.findIndex(place => place.id === this.id);

        storage.splice(index, 1);
    }

    static findById(id) {
        return storage.find(place => place.id === id);
    }

    static findByDescription(description) {
        return storage.find(place => place.description === description);
    }

    static removeAll() {
        storage.splice(0, storage.length);
        idCounter = 0;
    }

    static getAll({ offset, limit, sortBy }) {
        offset = Number(offset) || 0;
        limit = Number(limit) || 0;
        const slice = limit > 0
            ? arr => arr.slice(offset, limit)
            : arr => arr.slice(offset);

        let places = [];

        switch (sortBy) {
            case 'date':
                places = slice(storage.sort((p1, p2) =>
                    p1.creationTime.getTime() - p2.creationTime.getTime()));
                break;
            case 'alphabet':
                places = slice(storage.sort((p1, p2) => p1.description.localeCompare(p2)));
                break;
            default:
                places = slice(storage);
        }

        return places;
    }
}

module.exports = Place;
