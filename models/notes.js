'use strict';

class Notes {
    constructor(storage) {
        if (storage.notes === undefined) {
            storage.notes = [];
        }
        this._storage = storage;
    }

    getByIndex(index) {
        return this._storage.notes[index];
    }

    getAll() {
        return this._storage.notes;
    }

    clear() {
        this._storage.notes = [];
    }

    swap(was, become) {
        let notes = this._storage.notes;
        let temp = notes[was];
        notes[was] = notes[become];
        notes[become] = temp;
    }

    getLength() {
        return this._storage.notes.length;
    }

    add(name, description) {
        let result = {
            name,
            description: description,
            date: new Date(),
            visited: false
        };
        this._storage.notes.push(result);

        return result;
    }

    editDescription(index, description) {
        this._storage.notes[index].description = description;
    }

    editName(index, name) {
        this._storage.notes[index].name = name;
    }

    findIndexByName(name) {
        return this._storage.notes.findIndex((savedNote) => {
            if (savedNote !== undefined && savedNote.name === name) {
                return true;
            }

            return false;
        });
    }

    delete(index) {
        delete this._storage.notes[index];
    }

    setVisitState(index, visitState) {
        this._storage.notes[index].visited = visitState;
    }

}

exports.Notes = Notes;
