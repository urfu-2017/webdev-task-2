'use strict';

const LocationStorage = require('../models/LocationStorage');
const Base = require('./baseController');
const storage = new LocationStorage();

class Location extends Base {
    createPlace() {
        if (storage.has(this._req.place)) {
            this.createResponse({
                code: 409,
                message: 'Conflict, already exists. Use put if needed to update.'
            });
        }
        const date = new Date();
        storage.push({
            name: this._req.place, description: this._req.description || '',
            visited: false, timeCreated: date
        });

        this.createResponse({ code: 201, message: 'Created' });
    }

    get() {
        let result;
        if (this._req.findByDescr) {
            result = this._getPlacesByDescr();
        } else {
            result = this._getPlaces();
        }
        this.createResponse(result);
    }

    updatePlace() {
        if (storage.update(this._req.place, this._req.param, this._req.value)) {
            this.createResponse({ code: 200, message: 'Ok' });
        }

        this.createResponse({ code: 400, message: 'Bad request' });
    }

    swapPlaces() {
        if (storage.swap(this._req.place1, this._req.place2)) {
            this.createResponse({ code: 200, message: 'Ok' });
        }

        this.createResponse({ code: 400, message: 'Bad request' });
    }

    deletePlace() {
        if (this._req.place === 'all') {
            storage.delete();

            this.createResponse({ code: 200, message: 'Ok' });
        }
        if (storage.delete(this._req.place)) {
            this.createResponse({ code: 200, message: 'Ok' });
        }

        this.createResponse({ code: 400, message: 'Bad request' });
    }

    _sortBy(array, param) {
        switch (param) {
            case 'timeCreated':
                return array.sort((a, b) => a.timeCreated - b.timeCreated);
            case 'name':
                return array.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return [];
        }
    }

    _getPlaces() {
        let data = storage.get();
        if (this._req.sortBy) {
            data = this._sortBy(data, this._req.sortBy);
        }
        if (!data) {
            return { code: 400, message: 'Bad request' };
        }

        return { code: 200, message: 'Ok', body: data };
    }

    _getPlacesByDescr() {
        const data = storage.get('description', this._req.findByDescr);
        if (data.length) {
            return { code: 200, message: 'Ok', body: data };
        }

        return { code: 400, message: 'Bad request' };
    }
}

module.exports = Location;
