'use strict';

module.exports = class Place {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.isVisited = false;
        this.dateOfCreation = new Date();
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }

    changeState() {
        this.isVisited = !this.isVisited;
    }
};
