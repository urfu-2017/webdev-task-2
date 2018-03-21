'use strict';

let storage = [];
let currentId = 1;

class Place {
    constructor({ country, city, name, description }) {
        this.id = currentId++;
        this.country = country;
        this.city = city;
        this.name = name;
        this.description = description;
        this.visit = false;
        this.creationDate = new Date();
    }

    save() {
        storage.push(this);
    }

    static findByDescription(description) {
        return storage.find(place => place.description === description);
    }

    static findById(id) {
        return storage.find(place => place.id === id);
    }

    static findAll() {
        return storage;
    }

    static deleteAll() {
        storage = [];
    }

    static deleteById(id) {
        storage = storage.filter(place => place.id !== id);
    }

    static reshuffle(id1, id2) {
        let index1;
        let index2;
        let place1;
        let place2;

        for (let i = 0; i < storage.length; i++) {
            if (storage[i].id === id1) {
                index1 = i;
                place1 = storage[i];
            }
            if (storage[i].id === id2) {
                index2 = i;
                place2 = storage[i];
            }
        }
        storage[index1] = place2;
        storage[index2] = place1;
    }

    static getSortedPlacesByDate(order) {
        let storageCopy = JSON.parse(JSON.stringify(storage));

        if (order === 'asc') {
            return storageCopy.sort((firstPlace, secondPlace) =>
                firstPlace.creationDate < secondPlace.creationDate);
        }
        if (order === 'desc') {
            return storageCopy.sort((firstPlace, secondPlace) =>
                firstPlace.creationDate > secondPlace.creationDate);
        }

        return storage;
    }

    static getSortedPlacesByAlphabet(order) {
        let storageCopy = JSON.parse(JSON.stringify(storage));

        if (order === 'asc') {
            return storageCopy.sort((firstPlace, secondPlace) =>
                firstPlace.name < secondPlace.name);
        }
        if (order === 'desc') {
            return storageCopy.sort((firstPlace, secondPlace) =>
                firstPlace.name > secondPlace.name);
        }

        return storage;
    }
}

module.exports = Place;
