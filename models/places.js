'use strict';

const DB = require('./DB');

function copy(el) {
    return JSON.parse(JSON.stringify(el));
}

function sortByTime(a, b) {
    return b.createdAt - a.createdAt;
}

function sortByAlphabet(a, b) {
    const aDesc = a.description.toLowerCase();
    const bDesc = b.description.toLowerCase();
    if (aDesc < bDesc) {
        return -1;
    }
    if (aDesc > bDesc) {
        return 1;
    }

    return 0;
}

function findById(id) {
    for (let i = 0; i < DB.length; i++) {
        if (DB[i].id === id) {
            return {
                place: DB[i],
                index: i
            };
        }
    }

    return null;
}

let idCounter = 0;

class PlaceModel {
    static getAll({ sort, limit, page }) {
        let clonedDB = copy(DB);
        if (sort === 'alpha') {
            clonedDB.sort(sortByAlphabet);
        } else if (sort === 'time') {
            clonedDB.sort(sortByTime);
        }

        if (limit) {
            let paragraph = page ? page - 1 : 0;
            clonedDB = clonedDB.slice(paragraph * limit, paragraph * limit + limit);
        }

        return clonedDB;
    }

    static add(description) {
        let place = {
            id: idCounter++,
            createdAt: Number(new Date()),
            description: description,
            visited: false
        };
        DB.push(place);

        return place;
    }

    static update({ description, visited, id }) {
        let { place } = findById(id);

        if (!place) {
            return null;
        }

        place.description = description ? description : place.description;
        place.visited = visited === 'true';

        return place;
    }

    static delete(id) {
        const { place, index } = findById(id);
        if (!place) {
            return null;
        }
        DB.splice(index, 1);

        return place;
    }

    static deleteAll() {
        DB = [];

        return true;
    }

    static search(q) {
        const re = new RegExp(q, 'i');
        let localDB = [];
        for (let i = 0; i < DB.length; i++) {
            if (DB[i].description.search(re) !== -1) {
                localDB.push(DB[i]);
            }
        }

        return localDB;
    }
}

module.exports = PlaceModel;
