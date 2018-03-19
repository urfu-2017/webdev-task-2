import { Place } from './places'

export class PlacesRepository {
    constructor () {
        this._collection = [];
        this._currentId = 0;
    }

    add ({ name }) {
        if (!this.searchByName({name: name})) {
            const place = new Place(this._currentId++, name);
            this._collection.push(place);
            return place;
        }
    }

    list () {
        return this._collection.sort((a, b) => {
            if (a.priority < b.priority) {
                return 1;
            } else if(a.priority === b.priority) {
                return 0;
            } else {
                return -1;
            }
        });
    }

    searchByName ({ name }) {
        const place = this._collection.find(element => element.name === name);
        return place
    }

    searchById ({ id }) {
        const place = this._collection.find(element => element.id === parseInt(id));
        return place
    }

    editNameToId ({ id, name }) {
        const place = this.searchById({id: id});
        if (place) {
            place.name = name;
        }
    }

    changeVisitedById ({ id, isVisited }) {
        const place = this.searchById({id: id});
        if (place) {
            place.visited = isVisited;
        }
        return place;
    }

    changePriority ({ id, priority }) {
        const place = this.searchById({ id });
        if (place) {
            place.priority = parseInt(priority);
        }
    }

    delete ({ id }) {
        const removeIndex = this._collection.findIndex(element => element.id === id);
        const isFound = removeIndex !== -1;
        if (isFound) {
            this._collection.splice(removeIndex, 1);
        }
        return isFound;
    }
    
    clear () {
        this._collection = [];
    }
}
