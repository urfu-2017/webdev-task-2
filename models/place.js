'use strict';

let places = [];

module.exports = class Place {
    constructor(name) {
        this.name = name;
        this.visited = false;
        this.creationDate = new Date();
    }

    save() {
        places.push(this);
    }

    /**
     * Возвращает отсортированный список мест
     * Если передать некорректные параметры, то возвратятся значения по умолчанию
     * @param {String} fieldSort - index(default) || date || alphabet
     * @param {String} order - asc(default) || desc
     * @returns {Array}
     */
    static getAll(fieldSort, order) {
        switch (fieldSort) {
            case 'date':
                return places.slice().sort(compareByField('creationDate', order));
            case 'alphabet':
                return places.slice().sort(compareByField('name', order));
            default:
                if (order === 'desc') {
                    return places.slice().reverse();
                }

                return places.slice();
        }
    }

    static tryfind(name) {
        let index = places.findIndex(place => place.name === name);
        if (index === -1) {
            return false;
        }

        return places[index];
    }

    static tryEdit(name, newName) {
        let index = places.findIndex(place => place.name === name);
        if (index === -1) {
            return false;
        }
        places[index].name = newName;

        return true;
    }

    static tryVisit(name, isVisited) {
        let index = places.findIndex(place => place.name === name);
        if (index === -1) {
            return false;
        }
        places[index].visited = isVisited;

        return true;
    }

    static tryDelete(name) {
        let index = places.findIndex(place => place.name === name);
        if (index === -1) {
            return false;
        }
        places.splice(index, 1);

        return true;
    }

    static trySwap(index1, index2) {
        if (!(indexInArray(places, index1) && indexInArray(places, index2))) {
            return false;
        }

        let tempLink = places[index1];
        places[index1] = places[index2];
        places[index2] = tempLink;

        return true;
    }

    static clearList() {
        places = [];
    }
};

function indexInArray(array, index) {
    return typeof index === 'number' && !isNaN(index) && index >= 0 && index < array.length;
}

function compareByField(field, order) {
    return (a, b) => {
        if (a[field] < b[field]) {
            return order === 'desc' ? -1 : 1;
        }
        if (a[field] > b[field]) {
            return order === 'desc' ? 1 : -1;
        }

        return 0;
    };
}
