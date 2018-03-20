'use strict';


class Storage {

    constructor() {
        this.places = [];
        this.currentId = 0;
    }

    search(sort, start, count, description) {
        let res = this.places.slice();
        if (sort === 'lex') {
            res.sort((a, b) => a.description.localeCompare(b.description));
        }
        if (description) {
            res = res.filter(x => x.description.includes(description));
        }
        if (sort === 'date') {
            res = res.sort((a, b) => b.date - a.date);
        }
        if (start !== undefined && count !== undefined) {
            res = res.slice(start, start + count);
        }

        return res;
    }

    append(description) {
        this.places.push({ description,
            visited: false, id: this.currentId++, date: Date.now() });
    }

    find(id) {
        return this.places.find(place => place.id === Number(id));
    }

    edit(targetPlace, params) {
        const { description, visited, index } = params;
        if (index >= 0 && index !== null) {
            this.places = this.places.filter(place => place.id !== Number(targetPlace.id));
            this.places.splice(index, 0, targetPlace);
        }
        if (visited !== undefined) {
            targetPlace.visited = visited;
        }
        if (description !== undefined) {
            targetPlace.description = description;
        }
    }

    delete(id) {
        this.places = this.places.filter(place => place.id !== Number(id));
    }

    deleteAll() {
        this.places = [];
    }
}

module.exports = new Storage();
