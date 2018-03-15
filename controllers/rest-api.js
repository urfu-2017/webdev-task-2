'use strict';
const sights = require('../models/sights');
const config = require('../config/rest-api-config');


const _getSightFromIdRequest = req => {
    const id = Number(req.params.id);

    return sights.getById(id);
};


const _send404IfNotFound = (found, res) => {
    if (!found) {
        res.sendStatus(404);
    }

    return !found;
};


const _getDescriptionOrSend400 = (req, res) => {
    const description = req.body.description;
    if (description) {
        return description;
    }
    res.sendStatus(400);

    return null;
};


const _getOrderedSights = orderBy => {
    orderBy = orderBy || config.defaultOrdering;
    switch (orderBy) {
        case 'default':
            return sights.getOrderedByDefault();
        case 'date':
            return [...sights.getOrderedByDate()];
        case 'description':
            return [...sights.getOrderedByDescription()];
        default:
            return false;
    }
};


exports.getAllSights = (req, res) => {
    const orderedSights = _getOrderedSights(req.query.orderBy);
    if (!orderedSights) {
        res.sendStatus(400);

        return;
    }
    res.json(orderedSights);
};


exports.getSightsPage = (req, res) => {
    const sightsPerPage = req.query.sightsPerPage || config.defaultSightsPerPage;
    const pageNumber = Number(req.params.pageNumber) || 1;
    if (pageNumber <= 0 || sightsPerPage <= 0) {
        res.sendStatus(400);

        return;
    }

    const orderedSights = _getOrderedSights(req.query.orderBy);
    if (!orderedSights) {
        res.sendStatus(400);

        return;
    }

    const start = (pageNumber - 1) * sightsPerPage;
    const page = orderedSights.slice(start, start + sightsPerPage);
    if (!page.length) {
        res.sendStatus(404);
    } else {
        res.json(page);
    }
};


exports.createSight = (req, res) => {
    const description = _getDescriptionOrSend400(req, res);
    if (!description) {
        return;
    }
    sights.create(description);
    res.sendStatus(201);
};


exports.deleteAllSights = (req, res) => {
    sights.clear();
    res.sendStatus(200);
};


exports.getSightById = (req, res) => {
    const sight = _getSightFromIdRequest(req);
    if (!_send404IfNotFound(sight)) {
        res.json(sight);
    }
};


exports.setSightVisitedValue = value => (req, res) => {
    const sight = _getSightFromIdRequest(req);
    if (_send404IfNotFound(sight, res)) {
        return;
    }

    sight.visited = value;
    res.sendStatus(204);
};


exports.deleteSightById = (req, res) => {
    const sight = _getSightFromIdRequest(req);
    if (!_send404IfNotFound(sight)) {
        sights.remove(sight);
        res.sendStatus(204);
    }
};


exports.updateSightById = (req, res) => {
    const description = _getDescriptionOrSend400(req, res);
    if (!description) {
        return;
    }
    const sight = _getSightFromIdRequest(req);
    if (!_send404IfNotFound(sight)) {
        sights.update(sight, description);
        res.sendStatus(204);
    }
};


exports.changeIndex = (req, res) => {
    const [oldIndex, newIndex] = [req.params.oldIndex, req.params.newIndex]
        .map(Number);
    if (oldIndex >= sights.count || newIndex >= sights.count) {
        res.sendStatus(400);

        return;
    }

    sights.changeIndex(oldIndex, newIndex);
    res.sendStatus(204);
};


exports.findSightByDescription = (req, res) => {
    const description = req.params.description;
    const sightsArray = sights.findByDescription(description);
    if (_send404IfNotFound(sightsArray.length)) {
        return;
    }

    res.json(sightsArray);
};
