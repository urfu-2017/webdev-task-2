'use strict';
function sorterAlpha(a, b) {
    if (a.description > b.description) {
        return 1;
    }
    if (a.description < b.description) {
        return -1;
    }

    return 0;
}

function sorterDate(a, b) {
    if (a.creationDate > b.creationDate) {
        return 1;
    }
    if (a.creationDate < b.creationDate) {
        return -1;
    }

    return 0;
}

var storage = [
    {
        id: 0,
        description: 'Париж',
        isVisited: false,
        creationDate: new Date(2017, 0, 2)
    },
    {
        id: 1,
        description: 'Нью-Йорк',
        isVisited: true,
        creationDate: new Date(2018, 2, 19)
    },
    {
        id: 2,
        description: 'Москва',
        isVisited: false,
        creationDate: new Date(2016, 0, 2)
    }
];

class Place {
    constructor(description) {
        this.id = storage.length === 0 ? 0 : storage[storage.length - 1].id + 1;
        this.description = description;
        this.isVisited = false;
        this.creationDate = new Date();
    }
    save() {
        storage.push(this);
    }

    static getList(query) {
        var { sort, page, amountOnPage, search } = query;
        var clone = Object.assign([], storage);
        if (sort === 'alphabet') {
            return clone.sort(sorterAlpha);
        }

        if (sort === 'date') {
            return clone.sort(sorterDate);
        }

        if (page && amountOnPage) {
            return clone.slice((Number(page) - 1) * Number(amountOnPage),
                (Number(page) - 1) * Number(amountOnPage) + Number(amountOnPage));
        }

        if (search) {
            return clone.filter(elem => elem.description.includes(search));
        }


        return storage;
    }

    static removePlaces() {
        storage = [];
    }

    static removeCertain(Id) {
        Id = Number(Id);
        storage = storage.filter(elem =>elem.id !== Id);

    }

    static updateCertain(Id, body) {
        var { description, isVisited } = body;
        Id = Number(Id);
        for (var i = 0; i < storage.length; i++) {
            if (storage[i].id === Id) {

                storage[i].description = description ? description : storage[i].description;

                storage[i].isVisited = isVisited !== undefined ? isVisited : storage[i].isVisited;

            }
        }

    }

    static swap(query) {
        var { id1, id2 } = query;
        if (id1 < storage.length && id2 < storage.length) {
            [storage[id1], storage[id2]] = [storage[id2], storage[id1]];

            return storage;
        }
    }


}

module.exports = Place;
