'use strict';

const Place = require('./place');

module.exports = class User {
    constructor() {
        this.places = [];
        this.indexes = {};
    }

    addPlace(name, description = 'no description') {
        if (!name) {
            throw new Error('No name');
        }
        this.places.push(new Place(name, description));
        const index = this.places.length - 1;
        if (!this.indexes[name]) {
            this.indexes[name] = [index];
        } else {
            this.indexes[name].push(index);
        }

        return this;
    }

    deletePlace(index) {
        if (!this.places[index]) {
            throw new Error('Not exist');
        }
        const ind = this.indexes[this.places[index].name].indexOf(index);
        this.indexes[this.places[index].name].splice(ind, 1);

        return delete this.places[index];
    }

    togglePlace(index) {
        if (!this.places[index]) {
            throw new Error('Not exist');
        }

        this.places[index].changeState();
    }

    editPlace(index, description) {
        this.places[index].description = description;
    }

    clear() {
        this.places = [];
        this.indexes = {};
    }

    listPlaces() {
        return this.places;
    }

    getIndexesByName(name) {
        return this.indexes[name] || [];
    }

    getPlaceByIndex(index) {
        return this.places[index];
    }

    findPlaceByDecription(description) {
        return this.places.filter(place => {
            const regExp = new RegExp(description, 'ig');

            return regExp.test(place.description);
        });
    }

    switchPlaces(index1, index2) {
        const indexArray1 = this.indexes[this.places[index1].name];
        const indexArray2 = this.indexes[this.places[index2].name];
        indexArray1[indexArray1.indexOf(index1)] = index2;
        indexArray2[indexArray2.indexOf(index2)] = index1;

        const temp = this.places[index1];
        this.places[index1] = this.places[index2];
        this.places[index2] = temp;
    }
};
