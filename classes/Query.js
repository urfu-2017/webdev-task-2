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

        return new Query(this._storage, this._data);
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
        return new Query(this._storage, this._data.slice(num));
    }

    limit(num) {
        return new Query(this._storage, this._data.slice(0, 0 + num));
    }

    getData() {
        return this._data;
    }
}

module.exports = Query;
