'use strict';

let storage = [];
let id = 0;

class Place {
    constructor({ name, description }) {
        this.name = name;
        this.visited = false;
        this.id = id++;
        this.createDate = new Date().getTime();
        this.description = description;
    }

    save() {
        storage.push(this);
    }

    static sortByDate() {
        return storage.sort((placeOne, placeTwo) => {
            return placeOne.createDate - placeTwo.createDate;
        });
    }

    static sortByAlphabet() {
        return storage.sort((placeOne, placeTwo) => {
            return placeOne.name.localeCompare(placeTwo.name);
        });
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
        let foundPlaces = [];
        storage.forEach(place => {
            if (place.description === description) {
                foundPlaces.push(place);
            }
        });

        return foundPlaces;
    }

    static updatePlaceDescription(placeId, description) {
        const { isFind: isUpdate, foundIndex } = findById(placeId);
        if (isUpdate) {
            storage[foundIndex].description = description;
        }

        return isUpdate;
    }

    static updatePlaceVisit(placeId, visited) {
        const { isFind: isUpdate, foundIndex } = findById(placeId);
        if (isUpdate) {
            storage[foundIndex].visited = Boolean(visited);
        }

        return isUpdate;
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
        const { isFind: isFind1, foundIndex: foundIndex1 } = findById(id1);
        if (isFind1) {
            const { isFind: isFind2, foundIndex: foundIndex2 } = findById(id2);
            if (isFind2) {
                [storage[foundIndex1],
                    storage[foundIndex2]] = [storage[foundIndex2], storage[foundIndex1]];

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
