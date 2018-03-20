'use strict';

function dateCompare(a, b) {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }

    return 0;
}

function alphabetCompare(a, b) {
    if (a.desc < b.desc) {
        return -1;
    }
    if (a.desc > b.desc) {
        return 1;
    }

    return 0;
}

class Store {
    constructor() {
        this.store = [];
    }

    add(place) {
        this.store.push(place);
    }

    dateSort() {
        const copyStore = this.store.slice();

        return copyStore.sort(dateCompare);
    }

    alphabetSort() {
        const copyStore = this.store.slice();

        return copyStore.sort(alphabetCompare);
    }

    findDesc(desc) {
        return this.store.filter(elem => elem.desc.indexOf(desc) !== -1);
    }

    clear() {
        this.store = [];
    }

    delete(id) {
        this.store = this.store.filter(elem => elem.id !== Number(id));
    }

    findElemById(id) {
        for (let i = 0; i < this.store.length; i++) {
            if (this.store[i].id === Number(id)) {
                return i;
            }
        }
    }

    edit({ id, desc, isVisited }) {
        const index = this.findElemById(id);
        if (index) {
            this.setDesc(index, desc);
            this.setIsVisited(index, isVisited);
        }
    }

    setDesc(index, desc) {
        this.store[index].desc = desc || this.store[index].desc;
    }

    setIsVisited(index, isVisited) {
        this.store[index].isVisited = isVisited || this.store[index].isVisited;
    }

    insert({ id, indexTo }) {
        const indexFrom = this.findElemById(id);
        if (indexFrom && indexTo <= this.store.length) {
            const copy = {
                desc: this.store[indexFrom].desc,
                id: Number(id),
                isVisited: this.store[indexFrom].isVisited
            };
            this.delete(id);
            this.store.splice(indexTo, 0, copy);
        }
    }

    getStore(page, itemsCount) {
        if (page && itemsCount) {
            const leftBorder = Number(page) * Number(itemsCount);

            return this.store.slice(leftBorder, leftBorder + Number(itemsCount));
        }

        return this.store;
    }
}


module.exports = new Store();
