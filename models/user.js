'use strict';

const storage = {};
const Place = require('./place');

module.exports = class User {
    constructor() {
        this.places = [];
        this.indexes = {};
    }

    static createUser(name) {
        if (storage[name]) {
            throw new Error('User is already exist');
        }
        storage[name] = new User();
    }

    static addPlace(user, name, description) {
        return storage[user].__addPlace(name, description);
    }

    __addPlace(name, description = 'no description') {
        if (!name) {
            throw new Error('No name');
        }
        this.places.push(new Place(name, description, this.places.length));
        const index = this.places.length - 1;
        if (!this.indexes[name]) {
            this.indexes[name] = [index];
        } else {
            this.indexes[name].push(index);
        }

        return this;
    }

    static deletePlace(user, index) {
        return storage[user].__deletePlace(index);
    }

    __deletePlace(index) {
        if (!this.places[index]) {
            throw new Error('Not exist');
        }
        const ind = this.indexes[this.places[index].name].indexOf(index);
        this.indexes[this.places[index].name].splice(ind, 1);

        return delete this.places[index];
    }

    static togglePlace(user, index) {
        storage[user].__togglePlace(index);
    }

    __togglePlace(index) {
        if (!this.places[index]) {
            throw new Error('Not exist');
        }

        this.places[index].changeState();
    }

    static editPlace(user, index, description) {
        storage[user].__editPlace(index, description);
    }

    __editPlace(index, description) {
        this.places[index].description = description;
    }

    static clear(user) {
        storage[user].__clear();
    }

    __clear() {
        this.places = [];
        this.indexes = {};
    }

    static listPlaces(user, option) {
        return storage[user].__listPlaces(option);
    }

    __listPlaces(option) {
        let relevantPlaces = this.places.filter(place => place);
        switch (option) {
            case 'alphabet':
                relevantPlaces = relevantPlaces.sort((first, second) => {
                    if (first.name < second.name) {
                        return -1;
                    }
                    if (first.name > second.name) {
                        return 1;
                    }

                    return 0;
                });
                break;
            case 'date':
                relevantPlaces = relevantPlaces.sort((first, second) => {
                    if (first.date < second.date) {
                        return -1;
                    }
                    if (first.date > second.date) {
                        return 1;
                    }

                    return 0;
                });
                break;
            default:

        }

        return relevantPlaces;
    }

    static listPage(user, page, option) {
        storage[user].__listPage(page, option);
    }

    __listPage(page, option) {
        return this.listPlaces(option).slice((page - 1) * 20, page * 20);
    }

    static getIndexesByName(user, name) {
        return storage[user].__getIndexesByName(name);
    }

    __getIndexesByName(name) {
        return this.indexes[name] || [];
    }

    static getPlaceByIndex(user, index) {
        return storage[user].getPlaceByIndex(index);
    }

    __getPlaceByIndex(index) {
        return this.places[index];
    }

    static findPlaceByDescription(user, description) {
        return storage[user].__findPlaceByDescription(description);
    }

    __findPlaceByDescription(description) {
        return this.places.filter(place => {
            const regExp = new RegExp(description, 'ig');

            return regExp.test(place.description);
        });
    }

    static switchPlaces(user, index1, index2) {
        storage[user].__switchPlaces(index1, index2);
    }

    __switchPlaces(index1, index2) {
        const indexArray1 = this.indexes[this.places[index1].name];
        const indexArray2 = this.indexes[this.places[index2].name];
        indexArray1[indexArray1.indexOf(index1)] = index2;
        indexArray2[indexArray2.indexOf(index2)] = index1;

        const temp = this.places[index1];
        this.places[index1] = this.places[index2];
        this.places[index2] = temp;
        this.places[index1].changeIndex(index1);
        this.places[index2].changeIndex(index2);
    }
};
