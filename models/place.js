'use strict';

class Place {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.creationTime = Date.now();
        this.visited = false;
    }
}

module.exports = Place;
