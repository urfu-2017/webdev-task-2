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
        this.places.push(new Place(name, description, this.places.length));
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

    listPlaces(option) {
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

    listPage(page, option) {
        return this.listPlaces(option).slice((page - 1) * 20, page * 20);
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
        this.places[index1].changeIndex(index1);
        this.places[index2].changeIndex(index2);
    }
};
