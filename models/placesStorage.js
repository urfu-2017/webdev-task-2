'use strict';

const Place = require('./place');

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

        return index !== -1 ? this._places[index] : null;
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

        const places = this._places.slice();
        this._places[currentIndex] = places[index];
        this._places[index] = places[currentIndex];

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
