'use strict';

const { isUndefined } = require('util');
const ObjectID = require('mongodb').ObjectID;

module.exports.addPlace = function (req, database, site, { errRes, resultRes }) {
    if (isUndefined(req.body.description) || isUndefined(req.body.name)) {
        errRes();
    } else {
        const place = {
            name: req.body.name,
            description: req.body.description,
            visit: false,
            createDate: new Date(),
            site: site };
        database.insert(place, (err, result) => {
            if (err) {
                errRes();
            } else {
                resultRes(result.ops[0]);
            }
        });
    }
};

module.exports.deleteOne = function (req, database, errRes, resultRes) {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    database.remove(details, (err) => {
        if (err) {
            errRes();
        } else {
            resultRes('Item with id ' + id + ' deleted');
        }
    });
};

module.exports.deleteAll = function (req, database, errRes, resultRes) {
    database.remove({}, (err) => {
        if (err) {
            errRes();
        } else {
            resultRes('All item deleted');
        }
    });
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

module.exports.getPlaces = function (req, database, errRes, resultRes) {
    database.find((err, cursor) => {
        if (err) {
            errRes();
        } else {
            cursor.toArray(function (subErr, items) {
                if (subErr) {
                    errRes();
                } else {
                    if (!isUndefined(req.query.sort)) {
                        sortPlaces(items, req.query.sort);
                    } else {
                        items.sort((first, second) => {
                            return first.site - second.site;
                        });
                    }
                    resultRes(items);
                }
            });
        }

        return null;
    });
};

module.exports.getPlacesPage = function (req, res, database, { errRes, resultRes }) {
    database.find((err, cursor) => {
        if (err) {
            errRes();
        } else {
            cursor.toArray(function (subErr, items) {
                if (subErr) {
                    errRes();
                } else {
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
                    resultRes(subarray[parseInt(req.params.numberofpage)]);
                }
            });
        }

        return null;
    });
};

module.exports.findByDescription = function (req, database, errRes, resultRes) {
    database.find((err, cursor) => {
        if (err || isUndefined(req.query.description)) {
            errRes();
        } else {
            cursor.toArray(function (subErr, items) {
                if (subErr) {
                    errRes();
                } else {
                    let subDescription = req.query.description;
                    let places = [];
                    items.forEach(place => {
                        if (place.description.indexOf(subDescription) !== -1) {
                            places.push(place);
                        }
                    });
                    resultRes(places);
                }
            });
        }

        return null;
    });
};

module.exports.updatePlace = function (req, database, errRes, resultRes) {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    database.findOne(details, function (err, doc) {
        if (err) {
            errRes();
        } else {
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
                createDate: doc.createDate
            };
            database.update(details, place, (subErr) => {
                if (subErr) {
                    errRes();
                } else {
                    resultRes(place);
                }
            });
        }
    });
};

module.exports.changeSite = function (req, database, errRes, resultRes) {
    const firstID = { '_id': new ObjectID(req.query.first) };
    const secondID = { '_id': new ObjectID(req.query.second) };
    database.findOne(firstID, { site: 1 }, function (err, firstDoc) {
        if (err) {
            errRes();
        } else {
            var firstSite = firstDoc.site;
            database.findOne(secondID, { site: 1 }, function (subErr, secondDoc) {
                if (subErr) {
                    errRes();
                } else {
                    var secondSite = secondDoc.site;
                    database.update(firstID, { $set: { site: secondSite } });
                    database.update(secondID, { $set: { site: firstSite } });
                    resultRes('Swap done.');
                }
            });
        }
    });
};
