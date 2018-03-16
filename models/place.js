'use strict';

let storage = [];
let currentId = 0;


class Place {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
        this.visited = false;
        this.date = Date.now();
        this.id = currentId++;
    }

    save() {
        storage.push(this);
    }

    static swap({ firstId, secondId }) {
        const firstIndex = storage.findIndex((place) => (place.id === firstId));
        const secondIndex = storage.findIndex((place) => (place.id === secondId));
        if (firstIndex === -1 || secondIndex === -1) {
            return 404;
        }
        storage[firstIndex] = storage.splice(secondIndex, 1, storage[firstIndex])[0];

        return 200;
    }

    static change({ id, body }) {
        const changedPlace = storage.find((place) => (place.id === id));
        if (changedPlace === -1) {
            return 404;
        }

        if (body.newDescription) {
            changedPlace.description = body.newDescription;
        }

        if (body.isVisited) {
            changedPlace.visited = true;
        }

        return 200;
    }

    static remove(id) {
        if (id) {
            const index = storage.findIndex((place) => (place.id === id));
            if (index === -1) {
                return 404;
            }
            storage.splice(index, 1);

            return 200;
        }
        if (!id) {
            storage = [];

            return 200;
        }
    }

    static findAll({ sort, page }) {
        let localStorage = storage.slice();
        switch (sort) {
            case 'alph':
                localStorage = localStorage.sort(
                    (firstPlace, secondPlace) => (firstPlace > secondPlace ? -1 : 1));
                break;
            case 'date':
            default:
                localStorage = localStorage.sort(
                    (firstPlace, secondPlace) => (secondPlace.date - firstPlace.date));
                break;
        }

        if (page) {
            const subarrayLen = Math.ceil(localStorage.length / page);

            return localStorage.reduce((accumulator, currentValue, index) => {
                if (index % subarrayLen === 0) {
                    accumulator.push([]);
                }
                accumulator[accumulator.length - 1].push(currentValue);

                return accumulator;
            }, []);
        }

        return localStorage;
    }

    static find(description) {
        return storage.find((place) => (place.description === description));
    }
}

module.exports = Place;
