'use strict';

let storage = [];

let nextId = 0;
function getNextId() {
    return (nextId++).toString();
}

class Storage {
    add(data) {
        const id = getNextId();
        storage.push({ id, data });

        return id;
    }

    find(id) {
        const item = storage.find(i => i.id === id);
        if (!item) {
            return null;
        }

        return item.data;
    }

    findByQuery(query) {
        const offset = query.offset || 0;
        const limit = query.limit || Number.POSITIVE_INFINITY;
        const comparator = query.comparator;
        const filter = query.filter;

        const needSlice = offset !== 0 || limit !== Number.POSITIVE_INFINITY;
        const operations = [
            x => needSlice ? x.slice(offset, offset + limit) : x,
            x => filter ? x.filter(filter) : x,
            x => comparator ? x.sort(comparator) : x
        ];
        const allData = storage.map(item => item.data);

        return operations.reduce((acc, operation) => operation(acc), allData);
    }

    update(id, data) {
        const itemData = this.find(id);
        if (!itemData) {
            return false;
        }

        Object.keys(data)
            .filter(k => data[k] !== undefined && data[k] !== null)
            .forEach(k => {
                itemData[k] = data[k];
            });

        return true;
    }

    changeIndex(id, newIndex) {
        const oldIndex = storage.findIndex(i => i.id === id);
        if (newIndex < 0 || newIndex >= storage.length) {
            return false;
        }

        const item = storage[oldIndex];
        if (newIndex === oldIndex) {
            return true;
        } else if (newIndex > oldIndex) {
            storage.splice(
                oldIndex - 1,
                newIndex - oldIndex,
                storage.slice(oldIndex + 1, newIndex + 1));
        } else {
            storage.splice(
                newIndex + 1,
                oldIndex - newIndex,
                storage.slice(newIndex + 1, oldIndex + 1)
            );
        }
        storage[newIndex] = item;

        return true;
    }

    delete(id) {
        const itemIndex = storage.findIndex(item => item.id === id);
        if (itemIndex) {
            storage.splice(itemIndex, 1);
        }
    }

    clear() {
        storage = [];
        nextId = 0;
    }
}

module.exports = Storage;
