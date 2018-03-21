'use strict';

const { isUndefined } = require('util');
const ObjectID = require('mongodb').ObjectID;

module.exports.addPlace = async function (req, database, site) {
    if (isUndefined(req.body.description) || isUndefined(req.body.name)) {
        throw new Error('An error has occurred');
    } else {
        const place = {
            name: req.body.name,
            description: req.body.description,
            visit: false,
            createDate: new Date(),
            site: site };
        let addedPlace = await database.insert(place)
            .then(() => {
                return place;
            })
            .catch(() => {
                throw new Error('An error has occurred');
            });

        return addedPlace;
    }
};

module.exports.deleteOne = async function (req, database) {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    let result = await database.remove(details).then(() => {
        return 'Item with id ' + id + ' deleted';
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });

    return result;
};

module.exports.deleteAll = async function (req, database) {
    let result = await database.remove({}).then(() => {
        return 'All item deleted';
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });

    return result;
};

function sortPlaces(places, param) {
    if (param === 'name') {
        places.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            }

            return 0;
        });
    } else if (param === 'date') {
        places.sort((a, b) => {
            let firstDate = Date.parse(a.createDate);
            let secondDate = Date.parse(b.createDate);

            return firstDate - secondDate;
        });
    }
}

module.exports.getPlaces = async function (req, database) {
    let cursor = await database.find((err, _cursor) => {
        if (err) {
            throw new Error('An error has occurred');
        } else {
            return _cursor;
        }
    });
    let places = await cursor.toArray().then((items) => {
        if (!isUndefined(req.query.sort)) {
            sortPlaces(items, req.query.sort);
        } else {
            items.sort((first, second) => {
                return first.site - second.site;
            });
        }

        return items;
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });

    return places;
};

module.exports.getPlacesPage = async function (req, database) {
    let cursor = await database.find((err, _cursor) => {
        if (err) {
            throw new Error('An error has occurred');
        } else {
            return _cursor;
        }
    });
    let places = await cursor.toArray().then((items) => {
        if (!isUndefined(req.query.sort)) {
            sortPlaces(items, req.query.sort);
        } else {
            items.sort((first, second) => first.site - second.site);
        }
        let size = isUndefined(req.query.count) ? 10 : parseInt(req.query.count);
        let subarray = [];
        for (let i = 0; i < Math.ceil(items.length / size); i++) {
            subarray[i] = items.slice((i * size), (i * size) + size);
        }

        return subarray[parseInt(req.params.numberofpage)];
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });

    return places;
};

module.exports.findByDescription = async function (req, database) {
    let cursor = await database.find((err, _cursor) => {
        if (err) {
            throw new Error('An error has occurred');
        } else {
            return _cursor;
        }
    });
    let places = await cursor.toArray().then((items) => {
        let subDescription = req.query.description;
        let result = [];
        items.forEach(place => {
            if (place.description.indexOf(subDescription) !== -1) {
                result.push(place);
            }
        });

        return result;
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });

    return places;
};

module.exports.updatePlace = async function (req, database) {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    let result = await database.findOne(details).then(async (doc) => {
        var _visit = false;
        if (req.query.visit === 'true') {
            _visit = true;
        } else if (req.query.visit === 'false') {
            _visit = false;
        } else {
            _visit = doc.visit;
        }
        var _description = isUndefined(req.body.description)
            ? doc.description : req.body.description;
        let place = {
            name: doc.name,
            description: _description,
            visit: _visit,
            createDate: doc.createDate,
            site: doc.site
        };
        let _result = await database.update(details, place).then(() => {
            return place;
        })
            .catch(() => {
                throw new Error('An error has occurred');
            });

        return _result;
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });

    return result;
};

module.exports.changeSite = async function (req, database) {
    const firstID = { '_id': new ObjectID(req.query.first) };
    const secondID = { '_id': new ObjectID(req.query.second) };
    let firstPlace = await database.findOne(firstID, { site: 1 }).then((firstDoc) => {
        return firstDoc;
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });
    let secondPlace = await database.findOne(secondID, { site: 1 }).then((secondDoc) => {
        return secondDoc;
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });
    var firstSite = firstPlace.site;
    var secondSite = secondPlace.site;
    let first = await database.update(firstID, { $set: { site: secondSite } }).then(() => {
        return true;
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });
    let second = await database.update(secondID, { $set: { site: firstSite } }).then(() => {
        return true;
    })
        .catch(() => {
            throw new Error('An error has occurred');
        });
    if (!(first && second)) {
        throw new Error('An error has occurred');
    } else {
        return 'Swap done.';
    }
};
