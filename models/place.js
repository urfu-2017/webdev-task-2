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
        this.date = null;
    }

    save() {
        this.id = shortid.generate();
        this.date = Date.now();
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

    static findAll({ sort = 'date', pageNumber = 1, pageSize = 8, reverse = false }) {
        sort = reverse ? '-' + sort : sort;

        return answerByPage(pageNumber, storage.sort(sortBy(sort)), pageSize);
    }

    static update(id, { name, country, city }) {
        const index = storage.findIndex(place => place.id === id);
        if (index !== -1) {
            storage[index].name = name ? name : storage[index].name;
            storage[index].country = country ? country : storage[index].country;
            storage[index].city = city ? city : storage[index].city;
            storage[index].date = Date.now();

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

    /* static move(id, { site }) {
        if (site === 'start' && site === 0) {
            storage.unshift(storage[id]);
            storage.splice(id + 1, 1);

            return true;
        }
        if (site === 'end' && site === storage.length) {
            storage.unpop(storage[id]);
            storage.splice(id, 1);

            return true;
        }

        return shiftSite(site, id);
    }*/
}

module.exports = Place;

function answerByPage(pageNumber, storageSort, pageSize) {
    if (pageNumber) {

        return storageSort.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);
    }

    return storageSort;
}

/* function shiftSite(site, id) {
    if (site < storage.length) {
        let newStorage = storage.slice(site, storage.length);
        storage.push(storage[id]);
        storage = storage.concat(newStorage);
        let idOld = id < site ? id : id + 1;
        storage.splice(idOld, 1);

        return true;
    }

    return false;
}*/
