import Place from '../models/place';

exports.list = (req, res) => {
    const data = Place.findAll();
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
    const placeToEdit = req.params.name;
    const newDescription = req.query.description;
    const changedPlace = Place.changeDescription(placeToEdit, newDescription);
    res.json(changedPlace);
    res.sendStatus(200);
};

exports.isVisited = (req, res) => {
    const tickVisit = Place.isVisited(req.params.name);
    if (tickVisit) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

exports.deletePlace = (req, res) => {
    if (Place.isPlaceDeleted(req.params.name)) {
        res.sendStatus(404);
    } else {
        res.sendStatus(200);
    }
};

exports.deleteAll = (req, res) => {
    Place.deleteAll();
    res.sendStatus(200);
};

exports.find = (req, res) => {
    const found = Place.find(req.params.description);
    if (!found) {
        res.sendStatus(404);
    } else {
        res.status(200).send(found);
    }
};

exports.switchOrder = (req, res) => {
    const modifiedPlaces = Place.switchOrder(req.query.name1, req.query.name2);
    if (modifiedPlaces.length) {
        res.status(200).json(modifiedPlaces);
    } else {
        res.sendStatus(304);
    }
};


exports.sortByDate = (req, res) => {
    res.status(200).send(Place.sortByDate());
};

exports.sortByAbc = (req, res) => {
    res.status(200).send(Place.sortByAbc());
};

exports.onNewPage = (req, res) => {
    const pages = Place.onNewPage();
    res.status(200).send(pages[req.params.page]);
};
