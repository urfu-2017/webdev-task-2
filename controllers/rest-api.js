import sights from '../models/sights';
import config from '../config/rest-api-config';


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
            return null;
    }
};


export const getAllSights = (req, res) => {
    const orderedSights = _getOrderedSights(req.query.orderBy);
    if (!orderedSights) {
        res.sendStatus(400);

        return;
    }
    res.json(orderedSights);
};


const _getSightsPageParams = (sightsPerPage, pageNumber) => {
    sightsPerPage = sightsPerPage || config.defaultSightsPerPage;
    pageNumber = Number(pageNumber) || 1;

    if (pageNumber <= 0 || sightsPerPage <= 0) {
        return null;
    }

    return { sightsPerPage, pageNumber };
};


export const getSightsPage = (req, res) => {
    const params = _getSightsPageParams(req.query.sightsPerPage,
        Number(req.params.pageNumber));
    if (!params) {
        res.sendStatus(400);
    }

    const { sightsPerPage, pageNumber } = params;
    const orderedSights = _getOrderedSights(req.query.orderBy);
    if (!orderedSights) {
        res.sendStatus(400);

        return;
    }

    const start = (pageNumber - 1) * sightsPerPage;
    const page = orderedSights.slice(start, start + sightsPerPage);
    if (!page.length && pageNumber !== 1) {
        res.sendStatus(404);
    } else {
        res.json(page);
    }
};


export const createSight = (req, res) => {
    const description = _getDescriptionOrSend400(req, res);
    if (!description) {
        return;
    }
    sights.create(description);
    res.sendStatus(201);
};


export const deleteAllSights = (req, res) => {
    sights.clear();
    res.sendStatus(200);
};


export const getSightById = (req, res) => {
    const sight = _getSightFromIdRequest(req);
    if (!_send404IfNotFound(sight)) {
        res.json(sight);
    }
};


export const setSightVisitedValue = value => (req, res) => {
    const sight = _getSightFromIdRequest(req);
    if (_send404IfNotFound(sight, res)) {
        return;
    }

    sight.visited = value;
    res.sendStatus(204);
};


export const deleteSightById = (req, res) => {
    const sight = _getSightFromIdRequest(req);
    if (!_send404IfNotFound(sight)) {
        sights.remove(sight);
        res.sendStatus(204);
    }
};


export const updateSightById = (req, res) => {
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


export const changeIndex = (req, res) => {
    const [oldIndex, newIndex] = [req.params.oldIndex, req.params.newIndex]
        .map(Number);
    if (oldIndex >= sights.count || newIndex >= sights.count) {
        res.sendStatus(400);

        return;
    }

    sights.changeIndex(oldIndex, newIndex);
    res.sendStatus(204);
};


export const findSightByDescription = (req, res) => {
    const description = req.params.description;
    const sightsArray = sights.findByDescription(description);
    if (_send404IfNotFound(sightsArray.length)) {
        return;
    }

    res.json(sightsArray);
};
