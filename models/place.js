'use strict';

class Place {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.dateCreate = Date.now();
        this.isVisited = false;
    }
}

module.exports = Place;
