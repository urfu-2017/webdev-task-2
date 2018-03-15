'use strict';
let id = 1;

module.exports = class Place {
    constructor(desc) {
        this.desc = desc || '';
        this.id = id;
        this.isVisited = false;
        id++;
    }
};
