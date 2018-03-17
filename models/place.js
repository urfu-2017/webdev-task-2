'use strict';

let storage = [];
let counter = 0;

class Place {
    constructor(description) {
        this.id = counter++;
        this.description = description;
        this.visited = false;
        this.createdAt = Date.now();
    }

    static create(description) {
        const place = new Place(description);
        storage.push(place);

        return place;
    }

    static list() {
        return storage;
    }

    static listByDate() {
        return storage.slice().sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
    }

    static listByDescription() {
        return storage.slice().sort(function (a, b) {
            if (a.description < b.description) {
                return -1;
            }
            if (a.description > b.description) {
                return 1;
            }

            return 0;
        });
    }

    static listPaginal(arrayToShow, pageNumber, pageSize) {
        pageNumber--;
        let result = [];
        let hasNext = true;
        let start = pageNumber * pageSize;
        if (start >= arrayToShow.length) {
            hasNext = false;

            return [result, hasNext];
        }
        let end = start + pageSize;
        if (end >= arrayToShow.length) {
            end = arrayToShow.length;
            hasNext = false;
        }
        result = arrayToShow.slice(start, end);

        return [result, hasNext];
    }

    static find(field, value) {
        if (field === 'description') {
            return storage.filter(place => place[field].includes(value));
        }

        return storage.find(place => place[field] === value);
    }

    static editDescription(id, description) {
        const place = this.find('id', id);
        if (place) {
            place.description = description;
        }

        return place;
    }

    static editVisited(id, visited) {
        const place = this.find('id', id);
        if (place) {
            place.visited = visited;
        }

        return place;
    }

    static delete(field, value) {
        const index = storage.findIndex(place => place[field] === value);

        return (index === -1) ? null : storage.splice(index, 1);
    }

    static changeOrder(id, position) {
        const from = storage.findIndex(place => place.id === id);
        if (from === -1 || position > storage.length - 1) {
            return false;
        }
        const elementToMove = storage.splice(from, 1)[0];
        storage.splice(position, 0, elementToMove);

        return true;
    }

    static clear() {
        storage = [];
    }
}

module.exports = Place;
