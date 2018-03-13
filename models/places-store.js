'use strict';

const DEFAULT_COMPARER = 'default';
const DEFAULT_PAGE_SIZE = 3;

class PlacesStore {
    constructor() {
        this.store = [];
    }

    get(comparer = DEFAULT_COMPARER) {
        const places = this.store.slice();

        switch (comparer) {
            case 'default':
                return places;
            case 'name':
                return places.sort((x, y) => x.name.localeCompare(y.name));
            case 'date':
                return places.sort((x, y) => x.creationDate - y.creationDate);
            default:
                return null;
        }
    }

    _splitIntoPages(pageSize = DEFAULT_PAGE_SIZE) {
        const pagesCount = Math.ceil(this.store.length / pageSize);
        const pages = Array.from({ length: pagesCount }, () => []);

        this.store.forEach((place, index) => {
            const pageIndex = Math.floor(index / pageSize);
            pages[pageIndex].push(place);
        });

        return pages;
    }

    getPage(number) {
        const pagesCount = Math.ceil(this.store.length / DEFAULT_PAGE_SIZE);
        if (number > pagesCount) {
            return null;
        }

        return this._splitIntoPages()[number - 1];
    }

    search(query) {
        const lower = query.toLowerCase();

        return this.store.filter(x => x.name.includes(lower) || x.description.includes(lower));
    }

    drop() {
        this.store.length = 0;
    }

    add(place) {
        this.store.push(place);
    }

    remove(placeUUID) {
        const index = this.store.findIndex(x => x.uuid === placeUUID);

        if (index === -1) {
            return null;
        }

        return this.store.splice(index, 1)[0];
    }

    swap(firstUUID, secondUUID) {
        const firstIndex = this.store.findIndex(x => x.uuid === firstUUID);
        const secondIndex = this.store.findIndex(x => x.uuid === secondUUID);

        if (firstIndex === -1 || secondIndex === -1) {
            return null;
        }


        const first = this.store[firstIndex];
        this.store[firstIndex] = this.store[secondIndex];
        this.store[secondIndex] = first;

        return this.store;
    }

    edit(placeUUID, { name, description, visited }) {
        const place = this.store.find(x => x.uuid === placeUUID);

        if (!place) {
            return null;
        }

        if (name !== undefined) {
            place.name = name;
        }
        if (description !== undefined) {
            place.description = description;
        }
        if (visited !== undefined) {
            place.visited = visited;
        }

        return place;
    }
}

module.exports = new PlacesStore();
