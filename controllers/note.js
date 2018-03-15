'use strict';
const { findIndexByName } = require('../utils/utils');

function checkData(req, res) {
    const note = req.body;
    const name = req.params.name;

    if (name === undefined || name.length === 0 || note.description === undefined) {
        res.sendStatus('400');

        return false;
    }

    return { note, name };
}

function saveNote(req, res) {
    const resultChecking = checkData(req, res);
    if (!resultChecking) {
        return;
    }
    const { note, name } = resultChecking;

    global.notes.push({
        name,
        description: note.description,
        date: new Date(),
        visited: false
    });
}

function editNote(req, res) {
    const { note, name } = checkData(req, res);

    const foundIndex = findIndexByName(name);

    if (foundIndex === -1) {
        res.sendStatus(404);
    }

    global.notes[foundIndex].description = note.description;
}

function getNote(req, res) {
    const name = req.params.name;

    if (name === undefined) {
        res.sendStatus(404);
    }

    const foundIndex = findIndexByName(name);
    if (foundIndex === -1) {
        res.sendStatus(404);
    }
    res.send(JSON.stringify(global.notes[foundIndex]));
}

function deleteNote(req, res) {
    const name = req.params.name;

    if (name === undefined) {
        res.sendStatus(404);
    }

    const foundIndex = findIndexByName(name);
    if (foundIndex === -1) {
        res.sendStatus(404);
    }

    delete global.notes[foundIndex];
}

function changeNoteState(req, res) {
    const name = req.params.name;

    if (name === undefined) {
        res.sendStatus(404);
    }

    const state = req.params.state;
    const visited = -1;
    if (state === 'visit') {
        visited = true;
    }
    if (state === 'unvisit') {
        visited = false;
    }
    if (visited === -1) {
        res.sendStatus(400);
    }

    const foundIndex = findIndexByName(name);
    if (foundIndex === -1) {
        res.sendStatus(404);
    }

    global.notes[foundIndex].visited = visited;
}

function findNotes(req, res) {
    let body = req.body;
    if (body.description === undefined) {
        res.sendStatus(400);
    }

    let description = body.description;
    description.split(' ')
        .filter((word) => word.length !== 0)
        .forEach((word) => {
            let countWords = [];
            global.notes.forEach((note, index) => {
                const findWord = new RegExp(word, 'gi');
                while (findWord.exec(note.description) !== null) {
                    if (countWords[index] === undefined) {
                        countWords = { index, count: 0 };
                        continue;
                    }
                    countWords[index].count++;
                }
            });
            let result = countWords
                .sort(sortByCount)
                .map(countContainer => global.notes[countContainer.index]);
            res.send(JSON.stringify(result));
        });
}

function sortByCount(a, b) {
    if (a.count < b.count) {
        return -1;
    }
    if (a.count > b.count) {
        return 1;
    }

    return 0;
}

exports.saveNote = saveNote;
exports.editNote = editNote;
exports.getNote = getNote;
exports.deleteNote = deleteNote;
exports.changeNoteState = changeNoteState;
exports.findNotes = findNotes;
