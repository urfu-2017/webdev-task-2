'use strict'

const DEFAULT_COMPARER = 'default';
const DEFAULT_PAGE_SIZE = 3;

const store = [];

exports.get = function get(comparer = DEFAULT_COMPARER) {
    const places = store.slice();

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

function splitIntoPages(pageSize = DEFAULT_PAGE_SIZE) {
    pages = Array.from({ length: pageSize }, _ => []);

    store.forEach((place, index) => {
        let pageIndex = Math.floor(index / pageSize)
        pages[pageIndex].push(place);
    });

    return pages;
}

exports.getPage = function getPage(number) {
    if (number > store.length / DEFAULT_PAGE_SIZE) {
        return null;
    }

    return splitIntoPages()[number - 1];
}

exports.search = function search(query) {
    let lowerQuery = query.toLowerCase();

    return store.filter(x => x.name.includes(lowerQuery) || x.description.includes(lowerQuery));
}

exports.drop = function drop() {
    store.length = 0;
}

exports.add = function add(place) {
    store.push(place);
}

exports.remove = function remove(placeUUID) {
    const index = store.findIndex(x => x.uuid === placeUUID);

    if (index == -1) {
        return null;
    }

    return store.splice(index, 1)[0];
}

exports.swap = function swap(firstUUID, secondUUID) {
    const firstIndex = store.findIndex(x => x.uuid === firstUUID);
    const secondIndex = store.findIndex(x => x.uuid === secondUUID);

    if (firstIndex === -1 || secondIndex === -1) {
        return null;
    }


    const first = store[firstIndex];
    store[firstIndex] = store[secondIndex];
    store[secondIndex] = first;

    return store;
}

exports.edit = function edit(placeUUID, { name, description, visited }) {
    const place = store.find(x => x.uuid === placeUUID);

    if (!place) {
        return null;
    }

    if (name !== undefined) { place.name = name; }
    if (description !== undefined) { place.description = description; }
    if (visited !== undefined) { place.visited = visited; }

    return place;
}
