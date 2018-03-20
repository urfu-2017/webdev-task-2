const { BinTree } = require('bintrees');


class _Sight {
    constructor(description, id) {
        this.description = description;
        this.id = id;

        this.visited = false;
        this.creationDate = new Date();
    }
}


const _sights = new Map();
let _defaultOrder = [];
const _orderedByDescr = new BinTree(
    (a, b) => a.description.localeCompare(b.description));
let _lastId = 0;

export const count = () => _defaultOrder.length;

export const add = (sight) => {
    if (_sights.has(sight.id)) {
        throw new Error(`sight with id ${sight.id} has already been added`);
    }
    _defaultOrder.push(sight);
    _sights.set(sight.id, sight);
    _orderedByDescr.insert(sight);
};

export const create = (description) => {
    _lastId += 1;
    const sight = new _Sight(description, _lastId);
    add(sight);

    return sight;
};

export const update = (sight, description) => {
    _orderedByDescr.remove(sight);
    sight.description = description;
    _orderedByDescr.insert(sight);
};

export const clear = () => {
    _sights.clear();
    _defaultOrder = [];
    _orderedByDescr.clear();
};

export const remove = (sight) => {
    _defaultOrder = _defaultOrder
        .filter(p => p.id !== sight.id);
    _orderedByDescr.remove(sight);
    _sights.delete(sight.id);
};

export const getById = (id) => {
    return _sights.get(id);
};

export const findByDescription = (description) => {
    description = description.toLocaleLowerCase();

    return _defaultOrder
        .filter(p => p.description.toLocaleLowerCase().includes(description));
};

export const changeIndex = (oldIndex, newIndex) => {
    const sight = _defaultOrder[oldIndex];
    _defaultOrder.splice(oldIndex, 1);
    _defaultOrder.splice(newIndex, 0, sight);
};

export const getOrderedByDefault = () => {
    return _defaultOrder.slice();
};

export function* getOrderedByDate() {
    for (let sight of _sights.values()) {
        yield sight;
    }
}

export function* getOrderedByDescription() {
    const iter = _orderedByDescr.iterator();
    let item = null;
    while ((item = iter.next()) !== null) {
        yield item;
    }
}
