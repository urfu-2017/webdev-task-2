'use strict';

let idCounter = 0;
let locations = {};
let order = [];

class Location {
    constructor(description) {
        this.id = null;
        this.description = description;
        this.createAt = Date.now();
        this.isVisited = false;
    }

    save() {
        if (this.id === null) {
            this.id = idCounter++;
            order.push(this.id);
        }

        locations[this.id] = this;
    }

    delete() {
        if (this.id !== null) {
            delete locations[this.id];
            order = order.filter(id => id !== this.id);
        }
    }

    static changeOrder(locationId, position) {
        const location = Location.get(locationId);

        if (isNaN(position) || position > order.length) {
            throw new Error('Position must be less then number of locations');
        }

        const index = order.find(id => id === location.id);
        order.splice(index, 1);
        order.splice(position, 0, location.id);
    }

    static get(id) {
        const location = locations[id];

        if (!location) {
            throw new Error('Location not found');
        }

        return location;
    }

    static find(description = '') {
        const orderedLocations = order.map(id => locations[id]);

        if (description) {
            return orderedLocations.filter(location => location.description.includes(description));
        }

        return orderedLocations;
    }

    static clearList() {
        order = [];
        locations = {};
    }
}

module.exports = Location;
