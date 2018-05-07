'use strict';

module.exports = class Place {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.visited = false;
        this.creationDate = new Date();
    }
};
