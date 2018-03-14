'use strict';
const uuidv4 = require('uuid/v4');

class Place {
    constructor(description) {
        this.id = uuidv4();
        this.createdAt = new Date();
        this.description = description;
        this.isVisited = false;
    }
}

module.exports = Place;
