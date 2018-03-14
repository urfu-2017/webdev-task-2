'use strict';

const places = [];
let currentId = 0;

class Storage {
    static search() {
        return places;
    }

    static append(place) {
        places.push(Object.assign({}, place, { visited: false, id: currentId++ }));
    }

    static edit(id, newData) {
        const targetPlace = places.find(place => place.id === Number(id));
        if (targetPlace === undefined) {
            return false;
        }
        const { description, visited } = newData;
        if (visited) {
            targetPlace.visited = visited;
        }
        if (description) {
            targetPlace.description = description;
        }

        return true;
    }
}

module.exports = Storage;
