'use strict';

const idGenerator = require('../utils/idGenerator');

class Place {
    constructor(name, createdAt) {
        this.id = idGenerator.get();
        this.name = name;
        this.createdAt = createdAt || new Date();
        this.isVisited = false;
    }
}

module.exports = Place;
