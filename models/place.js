'use strict';

class Place {
    constructor(name, description, createdAt) {
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.isVisited = false;
    }
}

module.exports = Place;
