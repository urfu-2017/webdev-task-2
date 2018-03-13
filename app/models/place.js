'use strict';

class Place {
    constructor({ description, isVisited }) {
        this.isVisited = isVisited || false;
        this.description = description;
    }
}

module.exports = Place;
