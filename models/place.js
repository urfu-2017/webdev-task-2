'use strict';

const storage = require('./storage')();

let nextId = 0;
function getNextId() {
    return (nextId++).toString();
}

function getComparator(field) {
    if (field === 'createAt') {
        return (a, b) => a.createAt - b.createdAt;
    } else if (field === 'title') {
        return (a, b) => a.title.localeCompare(b.title);
    }
}

function getContainsFilter(containsString) {
    if (containsString) {
        return place => place.description.includes(containsString);
    }
}

module.exports = class Place {
    constructor(options) {
        this.id = getNextId();
        this.title = options.title;
        this.description = options.description;
        this.visited = false;
        this.createdAt = new Date();
    }

    isValid() {
        return typeof this.description === 'string' &&
               typeof this.title === 'string' &&
               typeof this.visited === 'boolean' &&
               this.createdAt instanceof Date;
    }

    save() {
        if (!this.isValid()) {
            return false;
        }

        storage.addOrUpdate(this);

        return true;
    }

    update(options) {
        this.description = options.description || this.description;
        this.title = options.title || this.title;
        this.visited = 'visited' in options ? options.visited : this.visited;
    }

    static find(id) {
        return storage.find(id);
    }

    static findByQuery(query) {
        const storageQuery = {
            limit: Number.parseInt(query.limit, 10),
            offset: Number.parseInt(query.offset, 10),
            comparator: getComparator(query.orderby),
            filter: getContainsFilter(query.contains)
        };

        return storage.findByQuery(storageQuery);
    }

    static changeIndex(oldIndex, newIndex) {
        return storage.changeIndex(oldIndex, newIndex);
    }

    static delete(id) {
        return storage.delete(id);
    }

    static deleteAll() {
        storage.clear();
        nextId = 0;
    }
};
