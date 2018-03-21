'use strict';

const shortid = require('shortid');
const sortBy = require('sort-by');

const storage = [];

class Place {
    constructor({ name, country, city }) {
        this.id = null;
        this.name = name;
        this.country = country;
        this.city = city;
        this.isVisited = false;
        this.createdDate = null;
    }

    save() {
        this.id = shortid.generate();
        this.createdDate = Date.now();
        storage.push(this);
    }

    static findItemById(id) {

        return storage.find(place => place.id === id);
    }

    static find(feature) {

        return storage.filter(place => {
            if (place.name.toLowerCase().includes(feature.toLowerCase()) ||
            place.country.toLowerCase().includes(feature.toLowerCase()) ||
            place.city.toLowerCase().includes(feature.toLowerCase())) {

                return true;
            }

            return false;
        });
    }

    static findAll({ sort = 'createdDate', pageNumber = 1, pageSize = 8, reverse = false }) {
        sort = reverse ? '-' + sort : sort;

        return answerByPage(pageNumber, storage.sort(sortBy(sort)), pageSize);
    }

    static update(id, { name, country, city }) {
        const index = storage.findIndex(place => place.id === id);
        if (index !== -1) {
            storage[index].name = name ? name : storage[index].name;
            storage[index].country = country ? country : storage[index].country;
            storage[index].city = city ? city : storage[index].city;
            storage[index].createdDate = Date.now();

            return true;
        }

        return false;
    }

    static visit(id) {
        const index = storage.findIndex(place => place.id === id);
        if (index !== -1) {
            storage[index].isVisited = true;

            return true;
        }

        return false;
    }

    static deletePlace(id) {
        const index = storage.findIndex(place => place.id === id);
        if (index !== -1) {
            storage.splice(index, 1);

            return true;
        }

        return false;
    }

    static deleteAll() {
        storage.splice(0, storage.length);

        return storage.length === 0;
    }
}

module.exports = Place;

function answerByPage(pageNumber, storageSort, pageSize) {
    if (pageNumber) {

        return storageSort.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);
    }

    return storageSort;
}
