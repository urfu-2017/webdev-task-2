'use strict';

let store = [];
let count = 1;


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

class Place {
    add(desc) {
        const place = {
            desc: desc || '',
            id: count,
            isVisited: false
        };
        store.push(place);
        count++;
    }

    dateSort() {
        const copyStore = store.slice();

        return copyStore.sort(dateCompare);
    }

    alphabetSort() {
        const copyStore = store.slice();

        return copyStore.sort(alphabetCompare);
    }

    findDesc(desc) {
        return store.filter(elem => elem.desc.indexOf(desc) !== -1);
    }

    clear() {
        store = [];
    }

    delete(id) {
        store = store.filter(elem => elem.id !== Number(id));
    }

    findElemById(id) {
        for (let i = 0; i < store.length; i++) {
            if (store[i].id === Number(id)) {
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
        store[index].desc = desc || store[index].desc;
    }

    setIsVisited(index, isVisited) {
        store[index].isVisited = isVisited || store[index].isVisited;
    }

    insert({ id, indexTo }) {
        const indexFrom = this.findElemById(id);
        if (indexFrom && indexTo <= store.length) {
            const copy = {
                desc: store[indexFrom].desc,
                id: Number(id),
                isVisited: store[indexFrom].isVisited
            };
            this.delete(id);
            store.splice(indexTo, 0, copy);
        }
    }

    getStore(page, itemsCount, sortMethod) {
        switch (sortMethod) {
            case 'date':
                return this.dateSort();
            case 'alphabet':
                return this.alphabetSort();
            default:
                break;
        }
        if (page && itemsCount) {
            const leftBorder = Number(page - 1) * Number(itemsCount);

            return store.slice(leftBorder, leftBorder + Number(itemsCount));
        }

        return store;
    }
}

module.exports = new Place();
