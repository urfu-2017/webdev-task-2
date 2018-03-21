'use strict';

const shortid = require('shortid');

const STORAGE = [];

class Place {
    constructor({ description }) {
        this.id = shortid.generate();
        this.creationDate = new Date();
        this.description = description;
        this.isVisited = false;
    }

    save() {
        STORAGE.push(this);
    }

    update({ description, isVisited, indexNumber }) {
        this.description = description ? description : this.description;
        this.isVisited = isVisited ? isVisited : this.isVisited;
        if (indexNumber) {
            this.movePlace(indexNumber);
        }
    }

    movePlace(toIndex) {
        const index = STORAGE.indexOf(this);
        toIndex = Math.floor(toIndex) - 1;
        if (toIndex < 0 || toIndex >= STORAGE.length || toIndex === index) {
            return;
        }

        STORAGE[index] = STORAGE[toIndex];
        STORAGE[toIndex] = this;
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
    }
}

module.exports = Place;
