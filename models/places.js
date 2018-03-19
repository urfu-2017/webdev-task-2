'use strict';

class Place {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.visited = false;
        this.creationDate = new Date();
    }
}

class PlacesStorage {
    constructor() {
        this._places = [];
        this._lastId = -1;
    }

    createPlace(description) {
        let place = new Place(++this._lastId, description);
        this._places.push(place);

        return place;
    }

    getPlace(id) {
        let index = this._findIndexById(id);

        return (index !== -1) ? this._places[index] : null;
    }

    list() {
        return this._places.slice();
    }

    find(query) {
        return this._places.filter(place => place.description.includes(query));
    }

    remove(id) {
        let index = this._findIndexById(id);

        return index !== -1 && this._places.splice(index, 1).length === 1;
    }

    moveTo(id, index) {
        let currentIndex = this._findIndexById(id);

        if (currentIndex === -1) {
            return false;
        }

        let place = this._places.splice(currentIndex, 1)[0];
        this._places.splice(index, 0, place);

        return true;
    }

    clear() {
        this._places = [];
    }

    _findIndexById(id) {
        return this._places.findIndex(place => place.id === id);
    }
}

module.exports = new PlacesStorage();
