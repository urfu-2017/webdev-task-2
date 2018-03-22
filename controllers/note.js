'use strict';

const { Notes } = require('../models/notes');
function checkData(req) {
    const note = req.body;
    const name = req.params.name;
    const notesModel = new Notes(req.storage);
    let notes = notesModel.getAll();

    if (name === undefined || name.length === 0 || note.description === undefined ||
        notes.some(savedNote => savedNote.name === name)) {
        return false;
    }

    return { note, name };
}

function saveNote(req, res) {
    const resultChecking = checkData(req);
    if (!resultChecking) {
        res.sendStatus('400');

        return;
    }
    const { note, name } = resultChecking;

    const notesModel = new Notes(req.storage);

    notesModel.add(name, note.description);
    res.sendStatus(200);
}

function editNote(req, res) {
    const resultChecking = checkData(req);
    if (!resultChecking) {
        res.sendStatus('400');

        return;
    }
    const { note, name } = resultChecking;

    const notesModel = new Notes(req.storage);

    const foundIndex = notesModel.findIndexByName(name);

    if (foundIndex === -1) {
        res.sendStatus(404);

        return;
    }

    if (note.name !== undefined) {
        notesModel.editName(foundIndex, note.name);
    }
    notesModel.editDescription(foundIndex, note.description);

    res.sendStatus(200);
}

function getNote(req, res) {
    const name = req.params.name;

    if (name === undefined) {
        res.sendStatus(404);

        return;
    }
    const notesModel = new Notes(req.storage);
    const foundIndex = notesModel.findIndexByName(name);
    if (foundIndex === -1) {
        res.sendStatus(404);

        return;
    }

    res.json(notesModel.getByIndex(foundIndex));
}

function deleteNote(req, res) {
    const name = req.params.name;

    if (name === undefined) {
        res.sendStatus(404);

        return;
    }
    const notesModel = new Notes(req.storage);

    const foundIndex = notesModel.findIndexByName(name);
    if (foundIndex === -1) {
        res.sendStatus(404);
    }

    notesModel.delete(foundIndex);
    res.sendStatus(200);
}

function changeNoteState(req, res) {
    if (req.params.name === undefined) {
        res.sendStatus(404);

        return;
    }

    const visitState = req.params.state === 'visit';

    const notesModel = new Notes(req.storage);

    const foundIndex = notesModel.findIndexByName(req.params.name);
    if (foundIndex === -1) {
        res.sendStatus(404);

        return;
    }

    notesModel.setVisitState(foundIndex, visitState);
    res.sendStatus(200);
}

function findNotes(req, res) {
    let body = req.body;
    if (body.description === undefined) {
        res.sendStatus(400);
    }
    const notesModel = new Notes(req.storage);

    const notes = notesModel.getAll();
    let description = body.description;
    description.split(' ')
        .filter((word) => word.length !== 0)
        .forEach((word) => {
            let countWords = [];
            notes.forEach((note, index) => {
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
                .map(countContainer => notes[countContainer.index]);
            res.json(result);
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
