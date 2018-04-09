'use strict';

class Place {
    constructor({ id, description, visited }) {
        this.description = description;
        this.id = id;
        this.visited = visited;
    }
}

module.exports = Place;
