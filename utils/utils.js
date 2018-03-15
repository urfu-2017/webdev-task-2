'use strict';

function findIndexByName(name) {
    return global.notes.findIndex((savedNote) => {
        if (savedNote.name === name) {
            return true;
        }

        return false;
    });
}

exports.findIndexByName = findIndexByName;
