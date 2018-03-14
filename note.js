'use strict';

// хранилище заметок
let storage = [];

// модель заметки
// одним из агументов конструктора был статус, но его нет, так как по умолчанию "Нужно посетить"
class Note {
    constructor({ desc }) {
        this.index = storage.length === 0 ? 0 : storage[storage.length - 1].index + 1;
        this.desc = desc;
        this.status = 0;
    }

    save() {
        storage.push(this);
    }

    static findAll() {
        return storage;
    }

    static findAllByDateUp() {
        const sortStorage = [];
        for (let i = 0; i < storage.length; i++) {
            let noteForSort = storage.find(note => note.index === i);
            if (noteForSort) {
                sortStorage.push(noteForSort);
            }
        }
        storage = sortStorage;

        return storage;
    }

    static findAllByDateDown() {
        const sortStorage = [];
        for (let i = storage.length - 1; i >= 0; i--) {
            let noteForSort = storage.find(note => note.index === i);
            if (noteForSort) {
                sortStorage.push(noteForSort);
            }
        }
        storage = sortStorage;

        return storage;
    }

    static findAllByAlph() {
        storage.sort((a, b) => {
            if (a.desc.toLowerCase() < b.desc.toLowerCase()) {
                return -1;
            }
            if (b.desc.toLowerCase() < a.desc.toLowerCase()) {
                return 1;
            }

            return 0;
        });

        return storage;
    }

    static findByPages(page, limit) {
        const pageStorage = [];
        const firstElem = (page * limit) - limit;
        for (let i = firstElem; i < firstElem + limit; i++) {
            if (storage[i]) {
                pageStorage.push(storage[i]);
            }
        }

        return pageStorage;
    }

    static deleteOne(index) {
        for (let i in storage) {
            if (storage[i].index === Number(index)) {
                storage.splice(i, 1);
            }
        }

        return storage;
    }

    static deleteAll() {
        storage = [];

        return storage;
    }

    static changeInfo(index, status, desc) {
        let noteToChange = storage.find(note => note.index === Number(index));
        if (desc) {
            noteToChange.desc = desc;
        }
        if (status) {
            noteToChange.status = status;
        }

        return noteToChange;
    }
}

module.exports = Note;
