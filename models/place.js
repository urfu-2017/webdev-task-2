'use strict';

let storage = [];
let idCounter = 0;

const compareBy = {
    date: (a, b) => a.creationTime.getTime() - b.creationTime.getTime(),
    alphabet: (a, b) => a.description.localeCompare(b.description),
    default: () => 0
};

class Place {
    constructor(description) {
        this.id = -1;
        this.description = description;
        this.creationTime = undefined;
        this.visited = false;
    }

    save() {
        this.id = idCounter++;
        this.creationTime = new Date();

        storage.push(this);
    }

    remove() {
        const index = storage.findIndex(place => place.id === this.id);

        storage.splice(index, 1);
    }

    static create(description) {
        return new Place(description);
    }

    static swap(id1, id2) {
        const index1 = storage.findIndex(place => id1 === place.id);
        const index2 = storage.findIndex(place => id2 === place.id);

        if (index1 === -1 || index2 === -1) {
            return false;
        }

        const container = storage[index1];

        storage[index1] = storage[index2];
        storage[index2] = container;

        return true;
    }

    static findById(id) {
        return storage.find(place => place.id === id);
    }

    static findByDescription(description) {
        return storage.find(place => place.description === description);
    }

    static removeAll() {
        storage = [];
        idCounter = 0;
    }

    static getAll({ offset, limit, sortName }) {
        offset = Number(offset) || 0;
        limit = Number(limit) || 0;
        const slice = limit > 0
            ? arr => arr.slice(offset, limit)
            : arr => arr.slice(offset);

        return slice(storage.slice().sort(compareBy[sortName]));
    }
}

module.exports = Place;
