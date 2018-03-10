'use strict';

let ID = 3;
let places = [
    {
        id: 1,
        description: 'Moscow',
        isVisited: true,
        creationDate: '2018-03-07T17:41:24.240Z'
    },
    {
        id: 2,
        description: 'Ekaterinburg',
        isVisited: false,
        creationDate: '2018-03-08T11:08:24.240Z'
    }
];

class Place {

    constructor(description) {
        this.id = null;
        this.description = description;
        this.isVisited = false;
        this.creationDate = new Date();
    }

    create() {
        this.id = ID++;
        places.push(this);
    }

    static findAll() {
        return places;
    }

    static find(description) {

        return places.filter(place => {
            return place.description.indexOf(description) !== -1;
        });
    }

    static get(id) {
        return places.findIndex(place => place.id === Number(id));
    }

    static update(index, data) {
        const place = places[index];

        place.description = data.description || place.description;
        place.isVisited = data.isVisited || place.isVisited;
    }

    static swap(index1, index2) {
        places[index1] = places.splice(index2, 1, places[index1])[0];
    }

    static delete(index) {
        places.splice(index, 1);
    }

    static clean() {
        places = [];
        ID = 0;
    }
}

module.exports = Place;
