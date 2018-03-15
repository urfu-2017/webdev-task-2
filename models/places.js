class Place {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.visited = false;
        this.createdAt = new Date();
    }
}

export class PlacesRepository {
    constructor () {
        this._collection = [];
        this._currentId = 0;
    }

    add ({ name }) {
        if (!this._collection.find(element => element.name === name)) {
            const place = new Place(this._currentId++, name);
            this._collection.push(place);
            return place;
        }
    }

    list () {
        return this._collection;
    }

    search ({ name }) {
        const place = this._collection.find(element => element.name === name);
        return place || {}
    }

    edit ({ id, name }) {
        const place = this._collection.find(element => element.id === id);
        if (place) {
            place.name = name;
        }
    }

    setVisited ({ id, isVisited }) {
        const place = this._collection.find(element => element.id);
        if (place) {
            place.visited = isVisited;
        }
        return place;
    }

    changePriority({ id }) {
        const placeIndex = this._collection.findIndex(element => element.id);
        if (placeIndex !== -1) {
            const place = this._collection[placeIndex];
            this._collection.splice(placeIndex, 1);
            this._collection.unshift(place);
        }
    }

    delete ({ id }) {
        const removeIndex = this._collection.findIndex(element => element.id === id);
        const isFound = removeIndex !== -1;
        if (isFound) {
            this._collection.splice();
        }
        return isFound;
    }
    
    clear () {
        this._collection = [];
    }
}
