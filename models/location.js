'use strict';

class Location {
    constructor(description) {
        this.id = null;
        this.description = description;
        this.createdAt = Date.now();
        this.isVisited = false;
    }
}

module.exports = Location;
