'use strict';

const LocationStorage = require('../models/LocationStorage');
const Response = require('./responseController');
const storage = new LocationStorage();

const sortBy = (array, param) => {
    switch (param) {
        case 'timeCreated':
            return array.sort((a, b) => a.timeCreated - b.timeCreated);
        case 'name':
            return array.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return [];
    }
};

const getPlaces = query => {
    let data = storage.get();
    if (query.sortBy) {
        data = sortBy(data, query.sortBy);
    }
    if (!data) {
        return { code: 400, message: 'Bad request' };
    }

    return { code: 200, message: 'Ok', body: data };
};

const getPlacesByDescr = query => {
    const data = storage.get('description', query.findByDescr);
    if (data.length) {
        return { code: 200, message: 'Ok', body: data };
    }

    return { code: 400, message: 'Bad request' };
};

class Location extends Response {
    createPlace() {
        if (storage.has(this.req.place)) {
            this.createResponse({
                code: 409,
                message: 'Conflict, already exists. Use put if needed to update.'
            });
        }
        const date = new Date();
        storage.push({
            name: this.req.place, description: this.req.description || '',
            visited: false, timeCreated: date
        });

        this.createResponse({ code: 201, message: 'Created' });
    }

    get() {
        let result;
        if (this.req.findByDescr) {
            result = getPlacesByDescr(this.req);
        } else {
            result = getPlaces(this.req);
        }
        this.createResponse(result);
    }

    updatePlace() {
        if (storage.update(this.req.place, this.req.param, this.req.value)) {
            this.createResponse({ code: 200, message: 'Ok' });
        }

        this.createResponse({ code: 400, message: 'Bad request' });
    }

    swapPlaces() {
        if (storage.swap(this.req.place1, this.req.place2)) {
            this.createResponse({ code: 200, message: 'Ok' });
        }

        this.createResponse({ code: 400, message: 'Bad request' });
    }

    deletePlace() {
        if (this.req.place === 'all') {
            storage.delete();

            this.createResponse({ code: 200, message: 'Ok' });
        }
        if (storage.delete(this.req.place)) {
            this.createResponse({ code: 200, message: 'Ok' });
        }

        this.createResponse({ code: 400, message: 'Bad request' });
    }

}

module.exports = Location;
