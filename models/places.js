'use strict';

class Place {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.visited = false;
        this.creationDate = new Date();
    }
}

class Storage {
    constructor() {
        this._places = [];
        this._lastId = -1;
    }

    add(description) {
        const place = new Place(++this._lastId, description);
        this._places.push(place);

        return this._lastId;
    }

    clear() {
        this._places = [];
    }

    list(sortParam) {
        const sortFunc = Storage._getSortingFunc(sortParam);

        return this._places.slice().sort(sortFunc);
    }

    deletePlace(id) {
        const index = this._findById(id);
        if (id === -1) {
            throw new Error('Place not found');
        }
        this._places.splice(index, 1);
    }

    changeDescription(id, description) {
        const place = this._findById(id);
        if (!place) {
            throw new Error('Place not found');
        }
        place.description = description;
    }

    toggleVisited(id, visited) {
        const place = this._findById(id);
        if (!place) {
            throw new Error('Place not found');
        }
        place.visited = visited;
    }

    searchByDescription(description) {
        const result = this._places.find(place => place.description.indexOf(description) !== -1);
        if (!result) {
            return null;
        }

        return result;
    }

    swapPlaces(firstId, secondId) {
        const first = this._findById(firstId);
        const second = this._findById(secondId);
        if (!first || !second) {
            throw new Error('Place not found');
        }
        first.id = secondId;
        second.id = firstId;

        return { newFirstId: secondId, newSecondId: firstId };
    }

    listByPages(sortParam, pageSize, pageNumber) {
        const list = this.list(sortParam);
        const start = (pageNumber - 1) * pageSize;
        const end = pageNumber * pageSize;

        return list.slice(start, end);
    }

    static _getSortingFunc(parameter) {
        switch (parameter) {
            case 'alphabet':
                return (first, second) => first.description.localeCompare(second.description);
            case 'date':
                return (first, second) => first.creationDate > second.creationDate ? 1 : -1;
            default:
                return (first, second) => first.id > second.id ? 1 : -1;
        }
    }

    _findById(id) {
        return this._places.find(place => place.id === id);
    }
}

exports.storage = new Storage();
