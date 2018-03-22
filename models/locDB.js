'use strict';

var def = 'default';
class LocDB {
    constructor() {
        this.loc = [];
    }

    get(compareFunc = def) {
        const locs = this.loc.slice();

        switch (compareFunc) {
            case 'default':
                return locs;
            case 'name':
                return locs.sort((x, y) => x.name.localeCompare(y.name));
            case 'date':
                return locs.sort((x, y) => x.creationTime - y.creationTime);
            default:
                return null;
        }
    }

    searchName(query) {
        const res = this.loc.filter(x => x.name.includes(query));

        return res;
    }

    searchDescription(query) {
        const res = this.loc.filter(x => x.description.includes(query));

        return res;
    }

    add(loc) {
        this.loc.push(loc);
    }

    remove(name) {
        const index = this.loc.findIndex(x => x.name === name);

        if (index === -1) {
            return null;
        }

        return this.loc.splice(index, 1)[0];
    }

    swap(name1, name2) {
        const firstIndex = this.loc.findIndex(x => x.name === name1);
        const secondIndex = this.loc.findIndex(x => x.name === name2);

        if (firstIndex === -1 || secondIndex === -1) {
            return null;
        }


        const first = this.loc[firstIndex];
        this.loc[firstIndex] = this.loc[secondIndex];
        this.loc[secondIndex] = first;

        return this.loc;
    }

    edit(name, { newName, description, visited }) {
        const loc = this.loc.find(x => x.name === name);

        if (!loc) {
            return null;
        }

        loc.name = newName;
        loc.description = description;
        loc.visited = visited;

        return loc;
    }
}

module.exports = new LocDB();
