'use strict';
const { BinTree } = require('bintrees');


class _Sight {
    constructor(description, id) {
        this.description = description;
        this.id = id;

        this.visited = false;
        this.creationDate = new Date();
    }
}


module.exports = {
    _sights: new Map(),
    _defaultOrder: [],
    _orderedByDescr: new BinTree(
        (a, b) => a.description.localeCompare(b.description)),
    _lastId: 0,

    get count() {
        return this._defaultOrder.length;
    },

    create(description) {
        this._lastId += 1;
        const sight = new _Sight(description, this._lastId);
        this.add(sight);

        return sight;
    },
    add(sight) {
        if (this._sights.has(sight.id)) {
            throw new Error(`sight with id ${sight.id} has already been added`);
        }
        this._defaultOrder.push(sight);
        this._sights.set(sight.id, sight);
        this._orderedByDescr.insert(sight);
    },
    update(sight, description) {
        this._orderedByDescr.remove(sight);
        sight.description = description;
        this._orderedByDescr.insert(sight);
    },
    clear() {
        this._sights.clear();
        this._defaultOrder = [];
        this._orderedByDescr.clear();
    },
    remove(sight) {
        this._defaultOrder = this._defaultOrder
            .filter(p => p.id !== sight.id);
        this._orderedByDescr.remove(sight);
        this._sights.delete(sight.id);
    },
    getById(id) {
        return this._sights.get(id);
    },
    findByDescription(description) {
        return this._defaultOrder
            .filter(p => p.description === description);
    },
    changeIndex(oldIndex, newIndex) {
        const sight = this._defaultOrder[oldIndex];
        this._defaultOrder.splice(oldIndex, 1);
        this._defaultOrder.splice(newIndex, 0, sight);
    },
    getOrderedByDefault() {
        return this._defaultOrder.slice();
    },
    * getOrderedByDate() {
        for (let sight of this._sights.values()) {
            yield sight;
        }
    },
    * getOrderedByDescription() {
        const iter = this._orderedByDescr.iterator();
        let item = null;
        while ((item = iter.next()) !== null) {
            yield item;
        }
    }
};
