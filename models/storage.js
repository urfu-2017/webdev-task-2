'use strict';

let storage = [];

function clone(data) {
    return Object.assign(Object.create(Object.getPrototypeOf(data)), data);
}

class Storage {
    addOrUpdate(data) {
        var existingData = storage.find(d => d.id === data.id);
        if (!existingData) {
            storage.push(data);
        } else {
            Object.keys(data).forEach(key => {
                existingData[key] = data[key];
            });
        }
    }

    find(id) {
        var foundData = storage.find(data => data.id === id);
        if (foundData) {
            return clone(foundData);
        }
    }

    delete(id) {
        const dataIndex = storage.findIndex(data => data.id === id);
        if (dataIndex) {
            storage.splice(dataIndex, 1);
        }
    }

    findByQuery(query) {
        const offset = query.offset || 0;
        const limit = query.limit || Number.POSITIVE_INFINITY;
        const comparator = query.comparator;
        const filter = query.filter;

        const needSlice = offset !== 0 || limit !== Number.POSITIVE_INFINITY;
        const operations = [
            x => comparator ? x.sort(comparator) : x,
            x => needSlice ? x.slice(offset, offset + limit) : x,
            x => filter ? x.filter(filter) : x
        ];

        return operations
            .reduce((acc, operation) => operation(acc), storage.map(clone))
            .map(clone);
    }

    changeIndex(oldIndex, newIndex) {
        if (newIndex < 0 || newIndex >= storage.length ||
            oldIndex < 0 || oldIndex >= storage.length) {
            return false;
        }

        const item = storage[oldIndex];
        if (newIndex > oldIndex) {
            storage.splice(
                oldIndex,
                newIndex - oldIndex,
                ...storage.slice(oldIndex + 1, newIndex + 1));
        } else {
            storage.splice(
                newIndex + 1,
                oldIndex - newIndex,
                ...storage.slice(newIndex, oldIndex)
            );
        }
        storage[newIndex] = item;

        return true;
    }

    clear() {
        storage = [];
    }
}

module.exports = () => new Storage();
