'use strict';

const Storage = require('./storage');
const storage = new Storage();

function getComparator(field) {
    if (field === 'createAt') {
        return (a, b) => a.createAt - b.createdAt;
    } else if (field === 'title') {
        return (a, b) => a.title.localeCompare(b.title);
    }
}

function getContainsFilter(containsString) {
    if (containsString) {
        return place => place.description.includes(containsString);
    }
}


module.exports.post = (req, res) => {
    const description = req.body.description;
    const title = req.body.title;
    if (typeof description !== 'string' || typeof title !== 'string') {
        console.info(typeof description);
        console.info(typeof title);
        res.status(400).send({
            error: 'place should has "description" and "title"'
        });

        return;
    }

    var id = storage.add({
        description,
        title,
        visited: false,
        createdAt: new Date()
    });

    res.status(201).send({ id });
};

module.exports.get = (req, res) => {
    const id = req.params.id;
    const place = storage.find(id);
    if (!place) {
        res.status(404).send({
            error: `place with id "${id}" not found`
        });

        return;
    }

    res.status(200).send(place);
};

module.exports.getByFilter = (req, res) => {
    const query = {
        limit: Number.parseInt(req.query.limit),
        offset: Number.parseInt(req.query.offset),
        comparator: getComparator(req.query.orderby),
        filter: getContainsFilter(req.query.contains)
    };

    const result = storage.findByQuery(query);

    res.status(200).send(result);
};

module.exports.changeIndex = (req, res) => {
    const id = req.params.id;
    const newIndex = Number.parseInt(req.params.newIndex);

    if (!storage.changeIndex(id, newIndex)) {
        res.status(404).send({
            error: 'id not exists or incorrect index'
        });

        return;
    }

    res.status(204).send();
};

function isValidPlaceForUpdate(place) {
    return (!('description' in place) || typeof place.description === 'string') &&
           (!('title' in place) || typeof place.title === 'string') &&
           (!('visited' in place) || typeof place.visited === 'boolean');
}

module.exports.patch = (req, res) => {
    if (!isValidPlaceForUpdate(req.body)) {
        res.status(400).send({
            error: 'place for patch should has at least one of fields: ' +
                   '"description", "title", "visited"'
        });

        return;
    }

    const id = req.params.id;
    const wasUpdate = storage.update(id, {
        description: req.body.description,
        title: req.body.title,
        visited: req.body.visited
    });
    if (!wasUpdate) {
        res.status(404).send();

        return;
    }

    res.status(204).send();
};

module.exports.delete = (req, res) => {
    storage.deletePlace(req.id);

    res.status(204).send();
};

module.exports.deleteAll = (req, res) => {
    storage.clear();

    res.status(204).send();
};
