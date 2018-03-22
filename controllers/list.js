
'use strict';
const { Notes } = require('../models/notes');

/* eslint-disable max-statements */
function getList(req, res) {
    let notes = (new Notes(req.storage)).getAll()
        .slice()
        .map((note, index) => {
            note.index = index;

            return note;
        });
    if (!sortNotes(req, notes)) {
        res.sendStatus(400);

        return;
    }

    if (!checkInteger(req.query.page) || !checkInteger(req.query.count)) {
        req.sendStatus(400);

        return;
    }

    if (req.query.count === undefined) {
        res.json(notes);

        return;
    }
    let startIndex = (req.query.page - 1) * req.query.count;
    if (notes.length <= startIndex) {
        res.sendStatus(404);

        return;
    }
    res.json(notes.slice(startIndex, notes.length - startIndex));
}

function checkInteger(value, res) {
    if (value !== undefined && !Number.isInteger(value) || value <= 0) {
        res.sendStatus(400);

        return false;
    }

    return true;
}
function sortByAlphabet(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }

    return 0;
}

function sortByDate(a, b) {
    if (a.date < b.date) {
        return -1;
    }
    if (a.date > b.date) {
        return 1;
    }

    return 0;
}

function sortNotes(req, notes) {
    let sortMultiplier = 1;
    let order = req.query.orderBy;
    if (order !== undefined && order.toLowerCase() === 'desc') {
        sortMultiplier = -1;
    }
    let sortBy = req.query.sortBy;
    if (sortBy === undefined) {
        return true;
    }
    if (sortBy === 'alphabet') {
        notes.sort(sortMultiplier * sortByAlphabet);

        return true;
    }
    if (sortBy === 'date') {
        notes.sort(sortMultiplier * sortByDate);

        return true;
    }

    return false;
}

function clearList(req, res) {
    let notesModel = new Notes(req.storage);
    notesModel.clear();
    res.sendStatus(200);
}

function editList(req, res) {
    let permutations = req.body.permutations;
    const notesModel = new Notes(req.storage);
    const length = notesModel.getLength();

    if (permutations === undefined ||
        !Array.isArray(permutations)) {
        res.sendStatus(400);

        return;
    }
    if (permutations.some(permutation =>
        isBadPermutationPart(permutation.was, length) ||
        isBadPermutationPart(permutation.become, length))) {
        res.sendStatus(400);

        return;
    }
    permutations.forEach(permutation => {
        notesModel.swap(permutation.was, permutation.become);
    });
    res.sendStatus(200);
}

function isBadPermutationPart(permutationValue, length) {
    return permutationValue === undefined ||
        !Number.isInteger(permutationValue) ||
        permutationValue < 0 ||
        permutationValue >= length;
}

exports.clearList = clearList;
exports.getList = getList;
exports.editList = editList;
