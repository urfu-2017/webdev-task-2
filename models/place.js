'use strict';

const sortProperties = ['name', 'createDate'];

let storage = [];
let id = 0;

class Place {
    constructor({ name, description }) {
        this.name = name;
        this.visited = false;
        this.description = description;
    }

    static findPlace({ name, description }) {
        return storage
            .find(place => place.name === name && place.description === description);
    }

    static create({ name, description }) {
        let place = new Place({ name, description });
        place.createDate = new Date().getTime();
        place.id = id++;
        place.save();
    }

    save() {
        storage.push(this);
    }

    static sort(property, order) {
        if (sortProperties.includes(property) &&
            (order === 'asc' || order === 'desc')) {
            let ascending = storage.sort((placeOne, placeTwo) => {
                if (typeof placeOne[property] === 'string') {
                    return placeOne[property].localeCompare(placeTwo[property]);
                }

                return placeOne[property] - placeTwo[property];
            });

            return order === 'asc' ? ascending : ascending.reverse();
        }

        return null;
    }

    static getPage(pageNumber, placesCount) {
        const pageCount = Math.ceil(storage.length / placesCount);
        if (pageCount >= pageNumber) {
            const index = (pageNumber - 1) * placesCount;
            placesCount = index === 0 ? placesCount : ++placesCount;

            return storage.slice(index, placesCount);
        }

        return null;
    }

    static searchPlaces(description) {
        return storage.filter(place => place.description === description);
    }

    static updatePlaceDescription(placeId, description) {
        const { isFind, foundIndex } = findById(placeId);
        if (isFind) {
            storage[foundIndex].description = description;

            return true;
        }

        return false;
    }

    static updatePlaceVisit(placeId, visited) {
        const { isFind, foundIndex } = findById(placeId);
        if (isFind) {
            storage[foundIndex].visited = Boolean(visited);

            return true;
        }

        return false;
    }

    static clearStorage() {
        storage = [];
    }

    static deletePlace(placeId) {
        const { isFind: isDelete, foundIndex } = findById(placeId);
        if (isDelete) {
            storage = storage
                .slice(0, foundIndex)
                .concat(storage.slice(foundIndex + 1, storage.length));
        }

        return isDelete;
    }

    static swap(id1, id2) {
        const { isFind, foundIndex } = findById(id1);
        if (isFind) {
            const { isFind: isFind1, foundIndex: foundIndex1 } = findById(id2);
            if (isFind1) {
                [storage[foundIndex],
                    storage[foundIndex1]] = [storage[foundIndex1], storage[foundIndex]];

                return true;
            }
        }

        return false;
    }
}

function findById(placeId) {
    let isFind = false;
    const foundIndex = storage.findIndex(place => place.id === placeId);
    isFind = foundIndex === -1 ? isFind : !isFind;

    return {
        isFind,
        foundIndex
    };
}

module.exports = Place;
