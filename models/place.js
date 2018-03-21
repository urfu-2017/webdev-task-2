'use strict';

let storage = [];
let currentId = 0;


function findIndexById(id) {
    return storage.findIndex((place) => (place.id === id));
}

class Place {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
        this.visited = false;
        this.createdAt = Date.now();
        this.id = currentId++;
    }

    save() {
        storage.push(this);
    }

    static swap({ firstId, secondId }) {
        const firstIndex = findIndexById(firstId);
        const secondIndex = findIndexById(secondId);
        if (firstIndex === -1 || secondIndex === -1) {
            return false;
        }
        storage[firstIndex] = storage.splice(secondIndex, 1, storage[firstIndex])[0];

        return true;
    }

    static change({ id, body }) {
        const changedPlace = storage.find((place) => (place.id === id));
        if (changedPlace === -1) {
            return false;
        }

        Object.keys(body).forEach(key => {
            changedPlace[key] = body[key];
        });

        return true;
    }

    static remove(id) {
        if (id) {
            const index = findIndexById(id);
            if (index === -1) {
                return false;
            }
            storage.splice(index, 1);

            return true;
        }
        if (!id) {
            storage = [];

            return true;
        }
    }

    static findAll({ sort, page }) {
        let localStorage = storage.slice();
        const sortPlacesMap = {
            'alph': (firstPlace, secondPlace) => (secondPlace.name > firstPlace.name ? -1 : 1),
            '-alph': (firstPlace, secondPlace) => (firstPlace.name > secondPlace.name ? -1 : 1),
            'date': (firstPlace, secondPlace) => (firstPlace.date - secondPlace.date),
            '-date': (firstPlace, secondPlace) => (secondPlace.date - firstPlace.date)
        };
        if (sort) {
            const comparator = sortPlacesMap[sort];
            localStorage = localStorage.sort(comparator);
        }

        if (page) {
            const pageLenght = Number(page);
            let resultStorage = [];
            for (let i = 0; i < localStorage.length; i += pageLenght) {
                resultStorage.push(localStorage.slice(i, i + pageLenght));
            }

            return resultStorage;
        }

        return localStorage;
    }

    static findByDescription(description) {
        return storage.find((place) => (place.description === description));
    }
}

module.exports = Place;
