'use strict';

let places = [];
let currentId = 0;

class Storage {
    static search({ sort, start, count }) {
        let res = places.slice();
        if (sort === 'lex') {
            res = res.sort((a, b) => a.description.localeCompare(b.description));
        }
        if (sort === 'date') {
            res = res.sort((a, b) => b.date - a.date);
        }
        if (start !== undefined && count !== undefined) {
            res = res.slice(start, start + count);
        }

        return res;
    }

    static append(place) {
        places.push(Object.assign({}, place,
            { visited: false, id: currentId++, date: Date.now() }));
    }

    static edit(id, newData) {
        const targetPlace = places.find(place => place.id === Number(id));
        if (targetPlace === undefined) {
            return false;
        }
        const { description, visited } = newData;
        if (visited !== undefined) {
            targetPlace.visited = visited;
        }
        if (description !== undefined) {
            targetPlace.description = description;
        }
        targetPlace.date = Date.now();

        return true;
    }

    static delete(id) {
        places = places.filter(place => place.id !== Number(id));
    }

    static deleteAll() {
        places = [];
    }

}

module.exports = Storage;
