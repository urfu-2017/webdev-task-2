'use strict';

let places = [];

class Place {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
        this.isVisited = false;
        this.created = Date.now();
    }

    insertPlace() {
        places.push(this);
    }

    static getPlacesList(sortType) {
        if (sortType === 'date') {
            return places.sort((a, b) => a.created > b.created);
        }

        return places.sort((a, b) => a.name > b.name);
    }

    static findPlace(description) {
        return places.find(place => place.description === description);
    }

    static findIndex(name) {
        let resultIndex = places.length;
        places.forEach((place, index) => {
            if (place.name === name) {
                resultIndex = index;
            }
        });

        return resultIndex;
    }

    static setDescription(newDescription, name) {
        const indexPlaceInArray = this.findIndex(name);
        places[indexPlaceInArray].description = newDescription;

        return true;
    }

    static visit(name) {
        const indexPlaceInArray = this.findIndex(name);
        places[indexPlaceInArray].isVisited = true;

        return true;
    }

    static popPlace(name) {
        const indexPlaceInArray = this.findIndex(name);
        if (places.splice(indexPlaceInArray, 1)) {
            return true;
        }

        return false;
    }

    static shiftPlaces(leftEdge, sign, rightEdge, increment) {
        const tempPlace = places[leftEdge];
        if (sign === 'most') {
            for (let i = leftEdge; i > rightEdge; i += increment) {
                places[i] = places[i += increment];
            }
        } else {
            for (let i = leftEdge; i < rightEdge; i += increment) {
                places[i] = places[i += increment];
            }
        }
        places[rightEdge] = tempPlace;
    }

    static switchOrder(name, numberInOrder) {
        const indexPlaceInArray = this.findIndex(name);
        if (numberInOrder === 'start') {
            this.shiftPlaces(indexPlaceInArray, 'most', 0, -1);
        } else if (numberInOrder === 'end') {
            let len = places.length - 1;
            this.shiftPlaces(indexPlaceInArray, 'less', len, 1);
        } else if (numberInOrder < indexPlaceInArray) {
            numberInOrder--;
            this.shiftPlaces(indexPlaceInArray, 'most', numberInOrder, -1);
        } else {
            numberInOrder--;
            this.shiftPlaces(indexPlaceInArray, 'less', numberInOrder, 1);
        }

        return places;
    }

    static clearAll() {
        places = [];
    }
}

module.exports = Place;
