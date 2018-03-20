'use strict';

module.exports = class Site {
    constructor({ id, name, description, isVisited = false }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isVisited = isVisited;
        this.createdAt = new Date();
    }
};
