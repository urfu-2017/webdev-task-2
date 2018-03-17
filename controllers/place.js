'use strict';

const Place = require('../models/Place');

const FIND_FIELDS = ['description', 'name', 'visited'];

module.exports.add = (req, res) => {
    const { name, description } = req.body;
    if (name && description) {
        const place = Place.add(name, description);

        res.status(201);
        res.send(place);
    } else {
        res.status(400).end();
    }
};

module.exports.get = (req, res) => {
    const places = Place.find();

    getSortedAndPage(places, req);

    res.status(200);
    res.send(places.getData());
};

module.exports.find = (req, res) => {
    const validBody = Object.keys(req.body).every(field => FIND_FIELDS.indexOf(field) !== -1);

    if (validBody) {
        const places = Place.find(req.body);

        getSortedAndPage(places, req);

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.edit = (req, res) => {
    const { find, data } = req.body;
    const validBody =
        find &&
        data &&
        Object.keys(find).every(field => FIND_FIELDS.indexOf(field) !== -1);


    if (validBody) {
        const places = Place.find(find).update(data);

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.visit = (req, res) => {
    const validBody = Object.keys(req.body).every(field => FIND_FIELDS.indexOf(field) !== -1);

    if (validBody) {
        const places = Place.find(req.body).update({
            visited: true
        });

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.unVisit = (req, res) => {
    const validBody = Object.keys(req.body).every(field => FIND_FIELDS.indexOf(field) !== -1);

    if (validBody) {
        const places = Place.find(req.body).update({
            visited: false
        });

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.remove = (req, res) => {
    const validBody = Object.keys(req.body).every(field => FIND_FIELDS.indexOf(field) !== -1);

    if (validBody) {
        const places = Place.find(req.body).remove();

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.swap = (req, res) => {
    const { name1, name2 } = req.body;

    if (name1 && name2) {
        Place.swap(name1, name2);

        res.status(200).end();
    } else {
        res.status(400).end();
    }
};

module.exports.clear = (req, res) => {
    Place.find().remove();

    res.status(200).end();
};

function getSortedAndPage(query, req) {
    const { sortBy, page, pageCount } = req.query;

    if (sortBy) {
        query.sort(sortBy);
    }

    if (page && pageCount) {
        const pageNumber = parseInt(page);

        query
            .skip(pageCount * pageNumber)
            .limit(pageCount);
    }
}
