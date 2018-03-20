'use strict';

class Place {
    constructor(name, createdAt) {
        this.name = name;
        this.createdAt = createdAt;
        this.isVisited = false;
    }
}

module.exports = Place;
