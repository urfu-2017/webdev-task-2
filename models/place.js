'use strict';

const uuidv4 = require('uuid/v4');

module.exports = class Place {
    constructor(name, description) {
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.visited = false;
        this.creationDate = Date.now();
    }
};
