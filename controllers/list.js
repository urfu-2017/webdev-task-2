
'use strict';

function getList(req, res) {
    let notes = global.notes.slice(0);
    sortNotes(req, res, notes);

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

function sortNotes(req, res, notes) {
    let sortMultiplier = 1;
    if (/^DESC$/i.test(req.query.orderBy)) {
        sortMultiplier = -1;
    }
    let sortBy = req.query.sortBy;
    if (sortBy === undefined) {
        return;
    }
    if (sortBy === 'alphabet') {
        notes.sort(sortMultiplier * sortByAlphabet);

        return;
    }
    if (sortBy === 'date') {
        notes.sort(sortMultiplier * sortByDate);

        return;
    }
    res.sendStatus(400);
}

function clearList(req, res) {
    global.notes = [];
    res.sendStatus(200);
}

function editList(req, res) {
    let permutations = req.body.permutations;
    if (permutations === undefined ||
        !Array.isArray(permutations)) {
        res.sendStatus(400);

        return;
    }
    if (permutations.some(permutation =>
        isBadPermutationPart(permutation.was) || isBadPermutationPart(permutation.become))) {
        res.sendStatus(400);

        return;
    }
    permutations.forEach(permutation => {
        let temp = global.notes[permutation.was];
        global.notes[permutation.was] = global.notes[permutation.become];
        global.notes[permutation.become] = temp;
    });
    res.sendStatus(200);
}

function isBadPermutationPart(permutationValue) {
    return permutationValue === undefined ||
        !Number.isInteger(permutationValue) ||
        permutationValue < 0 ||
        permutationValue >= global.notes.length;
}

exports.clearList = clearList;
exports.getList = getList;
exports.editList = editList;
