'use strict';

module.exports = class Place {
    constructor(name, description, index) {
        this.name = name;
        this.description = description;
        this.isVisited = false;
        this.dateOfCreation = new Date();
        this.index = index;
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }

    changeState() {
        this.isVisited = !this.isVisited;
    }

    changeIndex(index) {
        this.index = index;
    }
};
