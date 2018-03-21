'use strict';

const fs = require('fs');


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

    async _updateStorage() {
        return new Promise((resolve, reject) => {
            fs.writeFile('./storage/places.json',
                JSON.stringify(Place.findAll({}), null, '\t') + '\n',
                (error) => {
                    if (error) {
                        console.error(error.stack);

                        return reject(error);
                    }
                    resolve();
                });
        });
    }

    async save() {
        storage.push(this);
        await this._updateStorage();
    }

    static async swap({ firstId, secondId }) {
        const firstIndex = findIndexById(firstId);
        const secondIndex = findIndexById(secondId);
        if (firstIndex === -1 || secondIndex === -1) {
            return false;
        }
        storage[firstIndex] = storage.splice(secondIndex, 1, storage[firstIndex])[0];
        await this._updateStorage();

        return true;
    }

    static async change({ id, body }) {
        const changedPlace = storage.find((place) => (place.id === id));
        if (changedPlace === -1) {
            return false;
        }

        Object.keys(body).forEach(key => {
            changedPlace[key] = body[key];
        });
        await this._updateStorage();

        return true;
    }

    static async remove(id) {
        if (id) {
            const index = findIndexById(id);
            if (index === -1) {
                return false;
            }
            storage.splice(index, 1);
            await this._updateStorage();

            return true;
        }
        if (!id) {
            storage = [];
            await this._updateStorage();

            return true;
        }
    }

    static findAll({ sort, page }) {
        let localStorage = storage.slice();
        const sortPlacesMap = {
            'alph': (firstPlace, secondPlace) => (secondPlace.name > firstPlace.name ? -1 : 1),
            '-alph': (firstPlace, secondPlace) => (firstPlace.name > secondPlace.name ? -1 : 1),
            'date': (firstPlace, secondPlace) => (firstPlace.createdAt - secondPlace.createdAt),
            '-date': (firstPlace, secondPlace) => (secondPlace.createdAt - firstPlace.createdAt)
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
