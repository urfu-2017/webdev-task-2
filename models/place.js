'use strict';

const shortid = require('shortid');

const STORAGE = [];

class Place {
    constructor({ description }) {
        this.id = shortid.generate();
        this.creationDate = new Date();
        this.description = description;
        this.isVisited = false;
        this.indexNumber = null;
    }

    save() {
        STORAGE.push(this);
        this.indexNumber = STORAGE.length - 1;
    }

    update({ description, isVisited, indexNumber = this.indexNumber }) {
        this.description = description ? description : this.description;
        this.isVisited = isVisited ? isVisited : this.isVisited;
        this.movePlace(indexNumber);
    }

    movePlace(toIndex) {
        toIndex = Math.floor(toIndex);
        if (toIndex < 0 || toIndex >= STORAGE.length || toIndex === this.indexNumber) {
            return;
        }

        STORAGE[toIndex].indexNumber = this.indexNumber;
        STORAGE[this.indexNumber] = STORAGE[toIndex];
        STORAGE[toIndex] = this;
        this.indexNumber = toIndex;
    }

    static findByDescription(description) {
        let suitablePlaces = STORAGE
            .filter(place => place.description.toLowerCase().includes(description.toLowerCase()));

        return suitablePlaces;
    }

    static findById(id) {
        return STORAGE.find(place => place.id === id);
    }

    static deletePlace(place) {
        const indexToDelete = STORAGE.indexOf(place);
        STORAGE.splice(indexToDelete, 1);
    }

    static deleteAll() {
        STORAGE.splice(0, STORAGE.length);
    }

    static sortPlaces(sortBy) {
        const sortings = {
            date: (place1, place2) => place1.creationDate < place2.creationDate ? -1 : 1,
            description: (place1, place2) => place1.description < place2.description ? -1 : 1
        };
        STORAGE.sort(sortings[sortBy.toLowerCase()]);
        STORAGE.forEach((place, index) => {
            place.indexNumber = index;
        });
    }
}

module.exports = Place;
