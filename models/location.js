'use strict';

module.exports = class name {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.creationTime = Date.now();
        this.visited = false;
    }

    editDescription(description) {
        this.description = description;
    }

    visit() {
        this.visited = true;
    }
};
