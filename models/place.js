'use strict';

const uuidv4 = require('uuid/v4');

module.exports = class Place {
    constructor(name, description) {
        this.uuid = uuidv4();
        this.name = name;
        this.description = description;
        this.visited = false;
        this.creationDate = Date.now();
    }

    editDescription(description) {
        this.description = description;
    }

    visit() {
        this.visited = true;
    }
};
