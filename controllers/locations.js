'use strict';

const Location = require('../models/location');
const store = require('../models/locDB');


const err400 = (req, res) => res.sendStatus(400);


exports.createLoc = (req, res) => {
    const loc = new Location(req.body.name, req.body.description);
    store.add(loc);

    res.sendStatus(201);
};

exports.removeLoc = (req, res) => {
    if (req.query.name) {
        const loc = store.remove(req.query.name);

        if (loc === null) {
            err400(req, res);

            return;
        }
    } else {
        store.clear();
    }

    res.sendStatus(200);
};


exports.getLoc = (req, res) => {
    const loc = store.get(req.query.compareFunc);

    if (loc === null) {
        err400(req, res);

        return;
    }

    res.send(loc);
};

exports.searchLoc = (req, res) => {
    if (req.query.q === null) {
        err400(req, res);

        return;
    }

    const loc = store.searchDescription(req.query.q);

    res.send(loc);
};

exports.swapLoc = (req, res) => {
    if (!(req.query.name1 && req.query.name2)) {
        err400(req, res);

        return;
    }

    const locations = store.swap(req.query.name1, req.query.name2);

    if (!locations) {
        err400(req, res);

        return;
    }

    res.sendStatus(200);
};

exports.editLoc = (req, res) => {
    let requiredParams = req.query.name &&
        ((req.body.name && req.body.description) || req.body.visited);
    if (!requiredParams) {
        err400(req, res);

        return;
    }

    const name = req.query.name;
    const loc = store.edit(name, {
        name: req.body.name,
        description: req.body.description,
        visited: req.body.visited
    });

    if (!loc) {
        err400(req, res);

        return;
    }

    res.sendStatus(200);
};
