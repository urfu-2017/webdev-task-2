'use strict';

const storage = [];
let counter = 0;

class Place {
    constructor(name, descr) {
        this.id = counter++;
        this.name = name;
        this.descr = descr;
        this.visited = false;
        this.createdAt = Math.floor(Date.now() / 1000);
    }

    static create(name, descr) {
        const place = new Place(name, descr);
        storage.push(place);

        return place;
    }

    static listByDefault() {
        return storage;
    }

    static listByCreatedAt() {
        return storage.slice().sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
    }

    static listByAlphabet() {
        return storage.slice().sort(function (a, b) {
            if (a.descr < b.descr) {
                return -1;
            }
            if (a.descr > b.descr) {
                return 1;
            }

            return 0;
        });
    }

    static listPaginal(pageNumber, pageSize) {
        pageNumber--;
        let start = pageNumber * pageSize;
        start = start < storage.length ? start : 0;
        let end = start + pageSize;
        end = end < storage.length ? end : storage.length;

        return storage.slice(start, end);
    }

    static findById(id) {
        return storage.find(place => place.id === id);
    }

    static findByName(name) {
        return storage.find(place => place.name === name);
    }

    static findByDescr(descr) {
        return storage.find(place => place.descr === descr);
    }

    static editDescr(id, newDescr) {
        const place = this.findById(id);
        if (place) {
            place.descr = newDescr;
        }

        return place;
    }

    static editVisited(id, visited) {
        const place = this.findById(id);
        if (place) {
            visited = (visited === 'true');
            place.visited = visited;
        }

        return place;
    }

    static deleteById(id) {
        const index = storage.findIndex(place => place.id === id);

        return (index === -1) ? null : storage.splice(index, 1);
    }

    static deleteByName(name) {
        const index = storage.findIndex(place => place.name === name);

        return (index === -1) ? null : storage.splice(index, 1);
    }

    static deleteByDescr(descr) {
        const index = storage.findIndex(place => place.descr === descr);

        return (index === -1) ? null : storage.splice(index, 1);
    }

    static changeOrder(id, position) {
        const from = storage.findIndex(place => place.id === id);
        if (from === -1 || position > storage.length - 1) {
            return false;
        }
        storage.splice(position, 0, storage.splice(from, 1)[0]);

        return true;
    }

    static clear() {
        storage.splice(0, storage.length);
    }
}

module.exports = Place;
