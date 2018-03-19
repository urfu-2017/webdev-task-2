'use strict';
const sortLocations = require('../utils/sort-locations');

class LocationsStorage {
    constructor() {
        this.idCounter = 0;
        this.locations = {};
        this.order = [];
    }

    save(location) {
        if (location.id === null) {
            location.id = this.idCounter++;
            this.order.push(location.id);
        }

        this.locations[location.id] = location;
    }

    delete(location) {
        if (location.id === null) {
            throw new Error('Location not saved');
        }

        const { [location.id]: deletedLocation, ...locations } = this.locations;

        this.order = this.order.filter(id => id !== location.id);
        this.locations = locations;

        return deletedLocation;
    }

    get(locationId) {
        return this.locations[locationId] || null;
    }

    changeOrder(location, position) {
        if (isNaN(position) || position > this.order.length) {
            throw new Error('Position must be less then number of locations');
        }

        const index = this.order.find(id => id === location.id);
        this.order.splice(index, 1);
        this.order.splice(position, 0, location);
    }

    find(description = '', sortBy = 'order') {
        const orderedLocations = this.order.map(id => this.locations[id]);

        if (sortBy !== 'order') {
            sortLocations(orderedLocations, sortBy);
        }

        if (description) {
            return orderedLocations.filter(location => location.description.includes(description));
        }

        return orderedLocations;
    }

    clear() {
        this.order = [];
        this.locations = {};
    }
}

module.exports = LocationsStorage;
