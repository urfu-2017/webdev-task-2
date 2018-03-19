'use strict';
const sortLocations = require('../utils/sort-locations');

class LocationsStorage {
    constructor() {
        this.idCounter = 0;
        this.locations = {};
        this.order = [];
    }

    /**
     * @param {Location} location
     */
    save(location) {
        if (location.id === null) {
            location.id = this.idCounter++;
            this.order.push(location.id);
        }

        this.locations[location.id] = location;
    }

    /**
     * @param {Location} location
     * @returns {Location}
     */
    delete(location) {
        if (location.id === null) {
            throw new Error('Location not saved');
        }

        const { [location.id]: deletedLocation, ...locations } = this.locations;

        this.order = this.order.filter(id => id !== location.id);
        this.locations = locations;

        return deletedLocation;
    }

    /**
     * @param {Number} locationId
     * @returns {Location|null}
     */
    get(locationId) {
        return this.locations[locationId] || null;
    }

    /**
     * @param {Location} location
     * @param {Number} position
     */
    changeOrder(location, position) {
        if (isNaN(position) || position > this.order.length) {
            throw new Error('Position must be less then number of locations');
        }

        const index = this.order.find(id => id === location.id);
        this.order.splice(index, 1);
        this.order.splice(position, 0, location);
    }

    /**
     * @param {String} query
     * @param {String} sortBy
     * @param {Number} pageSize
     * @param {Number} pageNumber
     * @returns {Location[]}
     */
    find({ query = '', sortBy = 'order', pageSize = 10, pageNumber = 1 }) {
        let locations = this.order.map(id => this.locations[id]);

        if (pageSize < 1 || pageNumber < 1) {
            throw new Error('Page size and number can not less then 1');
        }

        if (sortBy !== 'order') {
            sortLocations(locations, sortBy);
        }

        if (query) {
            locations = locations
                .filter(location => location.description.includes(query));
        }

        const start = pageSize * (pageNumber - 1);
        const end = start + pageSize;
        locations = locations.slice(start, end);

        return locations;
    }

    clear() {
        this.order = [];
        this.locations = {};
    }
}

module.exports = new LocationsStorage();
