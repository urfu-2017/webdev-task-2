'use strict';

const Place = require('../models/place');
const schedule = require('../models/schedule');

exports.addNewPlace = (req, res) => {
    schedule.add(new Place(req.query.name));
    res.json(schedule.list);
};

exports.getPlacesList = (req, res) => {
    let method = req.query.sort;
    schedule.sortBy(method);
    res.json(schedule.list);
};

exports.searchByName = (req, res) => {
    res.json(schedule.find(req.query.name));
};

exports.editPlace = (req, res) => {
    schedule.changeName(req.query.oldName, req.query.newName);
    res.json(schedule.list);
};

exports.markPlace = (req, res) => {
    schedule.mark(req.query.name, req.query.flag);
    res.json(schedule.list);
};

exports.deletePlace = (req, res) => {
    schedule.delete(req.query.name);
    res.json(schedule.list);
};

exports.swapPlaces = (req, res) => {
    schedule.swap(req.query.name1, req.query.name2);
    res.json(schedule.list);
};

exports.clearSchedule = (req, res) => {
    schedule.clear();
    res.json(schedule.list);
};
