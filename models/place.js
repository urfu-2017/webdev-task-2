'use strict';

module.exports = class Place {
    constructor(name) {
        this.name = name;
        this.visited = false;
        this.creationDate = new Date();
    }
};
