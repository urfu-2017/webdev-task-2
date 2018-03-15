const Place = require ('../models/place');

exports.list = (req, res) => {
    const data = Place.findAll(req.params.sort);
    if (data) {
        res.send(data);
    } else {
        res.sendStatus(204);
    }
};

exports.create = (req, res) => {
    new Place(req.query).save();
    res.sendStatus(201);
};

exports.changeDescription = (req, res) => {
    const oldDescription = req.params.description;
    const newDescription = req.query.newDescription;
    const changed = Place.changeDescription(oldDescription, newDescription);
    if (changed) {
        res.sendStatus(200);
    }

    res.sendStatus(400);
};

exports.isVisited = (req, res) => {
    const tickVisit = Place.isVisited(req.params.description);
    if (tickVisit) {
        res.sendStatus(200);
    }

    res.sendStatus(404);

};

exports.deletePlace = (req, res) => {
    if (Place.deletePlace(req.params.description)) {
        res.sendStatus(200);
    }

    res.sendStatus(404);
};

exports.deleteAll = (req, res) => {
    Place.deleteAll();
    res.sendStatus(200);
};

exports.find = (req, res) => {
    const found = Place.find(req.params.description);
    if (!found) {
        res.sendStatus(404);
    }
    res.send(found);
};

exports.changeOrder = (req, res) => {
    Place.changeIndex(req.query.index1, req.query.index2);
    res.sendStatus(200);
};


exports.sortByDate = (req, res) => {
    res
        .send(Place.sortByDate())
        .sendStatus(200);
};

exports.sortByAbc = (req, res) => {
    res
        .send(Place.sortByAbc())
        .sendStatus(200);
};

exports.onNewPage = (req, res) => {
    const pages = Place.onNewPage();
    res
        .send(pages[req.params.page])
        .sendStatus(200);
};
