'use strict';

class Place {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.visited = false;
        this.creationDate = new Date();
    }
}

module.exports = Place;
