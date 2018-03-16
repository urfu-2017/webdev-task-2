'use strict';

class Query {
    constructor(storage, data = []) {
        this._data = data;
        this._storage = storage;
    }

    remove() {
        this._data
            .map(place => place.name)
            .forEach(name => {
                let index = this._storage.findIndex(place => place.name === name);
                if (index !== -1) {
                    this._storage.splice(index, 1);
                }
            });

        return this;
    }

    update(obj = {}) {
        this._data.forEach(data => {
            for (let key in obj) {
                if (data[key] !== undefined) {
                    data[key] = obj[key];
                }
            }
        });

        return this;
    }

    sort(field, desc = 1) {
        this._data.sort((a, b) => {
            if (a[field] > b[field]) {
                return desc;
            }

            if (a[field] < b[field]) {
                return desc * -1;
            }

            return 0;
        });

        return this;
    }

    skip(num) {
        this._data = this._data.slice(num);

        return this;
    }

    limit(num) {
        this._data = this._data.slice(0, 0 + num);

        return this;
    }

    getData() {
        return this._data;
    }
}

module.exports = Query;
