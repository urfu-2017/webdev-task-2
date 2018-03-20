'use strict';

let list = {};
let currentId = 1;
let currentPlaceInList = 0;
let idToPlaceInList = {};

class Place {
    constructor({ name, description }) {
        this.id = currentId++;
        this.name = name;
        this.description = description;
        this.isVisited = false;
        this.creationAtUTC = Date.now();
    }

    save() {
        idToPlaceInList[this.id] = currentPlaceInList++;
        list[idToPlaceInList[this.id]] = this;
    }

    static getAll() {
        return Object.values(list);
    }

    static deleteAll() {
        idToPlaceInList = {};
        list = {};
    }

    static deleteById(id) {
        let placeInList = idToPlaceInList[id];
        delete idToPlaceInList[id];
        delete list[placeInList];
    }

    static isContainPlace(id) {
        let placeInList = idToPlaceInList[id];

        return list[placeInList] !== undefined;
    }

    static updateById(id, description, isVisited) {
        let placeInList = idToPlaceInList[id];
        let place = list[placeInList];
        if (description !== undefined) {
            place.description = description;
        }
        if (isVisited !== undefined) {
            place.isVisited = isVisited;
        }
    }

    static shuffle(firstId, secondId) {
        let firstPlaceInList = idToPlaceInList[firstId];
        let secondPlaceInList = idToPlaceInList[secondId];

        let firstPlace = list[firstPlaceInList];
        let secondPlace = list[secondPlaceInList];

        idToPlaceInList[secondId] = firstPlaceInList;
        idToPlaceInList[firstId] = secondPlaceInList;

        list[firstPlaceInList] = secondPlace;
        list[secondPlaceInList] = firstPlace;
    }
}

module.exports = Place;
