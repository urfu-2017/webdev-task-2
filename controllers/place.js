'use strict';

const config = require('config');

const Place = require('../models/Place');

const placesOnPage = config.get('placesOnPage');

const FIND_FIELDS = ['description', 'name', 'visited'];

module.exports.add = (req, res) => {
    if (req.body.name && req.body.description) {
        let place = Place.add(req.body.name, req.body.description);

        res.status(201);
        res.send(place);
    } else {
        res.status(400).end();
    }
};

module.exports.get = (req, res) => {
    let places = Place.find();

    getSortedAndPage(places, req);

    res.status(200);
    res.send(places.getData());
};

module.exports.find = (req, res) => {
    let validBody = Object.keys(req.body).every(field => FIND_FIELDS.indexOf(field) !== -1);

    if (validBody) {
        let places = Place.find(req.body);

        getSortedAndPage(places, req);

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.edit = (req, res) => {
    let validBody =
        req.body.find &&
        req.body.data &&
        Object.keys(req.body.find).every(field => FIND_FIELDS.indexOf(field) !== -1);


    if (validBody) {
        let places = Place.find(req.body.find).update(req.body.data);

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.visit = (req, res) => {
    let validBody = Object.keys(req.body).every(field => FIND_FIELDS.indexOf(field) !== -1);

    if (validBody) {
        let places = Place.find(req.body).update({
            visited: true
        });

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.unVisit = (req, res) => {
    let validBody = Object.keys(req.body).every(field => FIND_FIELDS.indexOf(field) !== -1);

    if (validBody) {
        let places = Place.find(req.body).update({
            visited: false
        });

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.remove = (req, res) => {
    let validBody = Object.keys(req.body).every(field => FIND_FIELDS.indexOf(field) !== -1);

    if (validBody) {
        let places = Place.find(req.body).remove();

        res.status(200).send(places.getData());
    } else {
        res.status(400).end();
    }
};

module.exports.swap = (req, res) => {
    if (req.body.name1 && req.body.name2) {
        Place.swap(req.body.name1, req.body.name2);

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
    if (req.query.sortBy) {
        query.sort(req.query.sortBy);
    }

    if (req.query.page) {
        let page = parseInt(req.query.page);

        query
            .skip(placesOnPage * page)
            .limit(placesOnPage);
    }
}
