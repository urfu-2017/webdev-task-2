'use strict';
let id = 0;

class Place {
    constructor(desc) {
        this.desc = desc || '';
        this.id = id;
        this.isVisited = false;
        id++;
    }

}

exports.Place = Place;
