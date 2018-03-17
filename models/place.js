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

    update({ description, isVisited }) {
        this.description = description ? description : this.description;
        this.isVisited = isVisited ? isVisited : this.isVisited;
    }

    static findByDescription(sortBy, description) {
        const sortings = {
            date: (place1, place2) => place1.creationDate < place2.creationDate ? -1 : 1,
            description: (place1, place2) => place1.description < place2.description ? -1 : 1
        };

        let suitablePlaces = STORAGE.filter(place =>
            place.description.toLowerCase().includes(description.toLowerCase()));

        suitablePlaces.sort(sortings[sortBy.toLowerCase()]);

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
}

module.exports = Place;
