'use strict';

let places = [];

module.exports = class Place {
    constructor({ name }) {
        this.id = places.length;
        this.name = name;
        this.visited = false;
        this.createAt = new Date();
    }

    save() {
        places.push(this);
    }

    static get(id) {
        return places.find(place => place.id === id);
    }

    /**
     * Возвращает отсортированный список мест
     * Если передать некорректные параметры, то возвратятся значения по умолчанию
     * @param {Object} container1 - содержит условия для фильтрации (default - фильтрации нет)
     * @param {String} name - значение для фильтрации по полю name
     * @param {String} visited - значение для фильтрации по полю visited
     * (false - false, остальные -> true)
     * @param {Number} from - Начало страницы
     * @param {Number} to - конец страницы
     * @param {Object} container2 - содержит условия для сортировки (default - сортировки нет)
     * @param {String} fieldSort - date || alphabet
     * @param {String} order - asc(default) || desc
     * @returns {Array}
     */
    static getAll({ name, visited, from, to }, { fieldSort, order }) {
        let processedPlaces = filterByField(places.slice(), { name, visited });
        sortByField(processedPlaces, { fieldSort, order });

        return getPage(processedPlaces, { from, to });
    }

    static edit(id, editParameters) {
        const place = Place.get(id);
        if (!place) {
            return;
        }
        Object.keys(editParameters).forEach(key => {
            place[key] = editParameters[key];
        });

        return place;
    }

    static remove(id) {
        const index = places.findIndex(place => place.id === id);
        if (index === -1) {
            return;
        }
        places.splice(index, 1);

        return true;
    }

    static swap(index1, index2) {
        if (!(indexInArray(places, index1) && indexInArray(places, index2))) {
            return false;
        }

        const tempLink = places[index1];
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

function filterByField(processedPlaces, { name, visited }) {
    if (name) {
        processedPlaces = processedPlaces.filter(place => place.name === name);
    }
    const isVisited = visited !== 'false';
    if (visited) {
        processedPlaces = processedPlaces.filter(place => place.visited === isVisited);
    }

    return processedPlaces;
}

function sortByField(processedPlaces, { fieldSort, order }) {
    switch (fieldSort) {
        case 'date':
            processedPlaces.sort(compareByField('createAt', order));
            break;
        case 'alphabet':
            processedPlaces.sort(compareByField('name', order));
            break;
        default:
            if (order === 'desc') {
                processedPlaces.reverse();
            }
    }
}

function getPage(processedPlaces, { from, to }) {
    if (isNaN(from) || isNaN(to)) {
        return processedPlaces;
    }
    if (indexInArray(processedPlaces, from) && indexInArray(processedPlaces, to)) {
        return processedPlaces.slice(from, to);
    }
}
