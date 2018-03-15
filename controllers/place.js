'use strict';

const Place = require('../models/place');
const Schedule = require('../models/schedule');

let schedule = new Schedule();

exports.addNewPlace = (req, res) => {
    schedule.add(new Place(req.query.name));
    res.json(schedule.schedule);
};

exports.getListPlaces = (req, res) => {
    let method = req.query.sort;
    if (method === 'date') {
        schedule.sortByDate();
    }
    if (method === 'name') {
        schedule.sortByName();
    }
    res.json(schedule.schedule);
};

exports.searchByName = (req, res) => {
    res.json(schedule.findPlace(req.query.name));
};

exports.editPlace = (req, res) => {
    schedule.changeName(req.query.oldName, req.query.newName);
    res.json(schedule.schedule);
};

exports.markPlace = (req, res) => {
    schedule.markPlace(req.query.name, req.query.flag);
    res.json(schedule.schedule);
};

exports.deletePlace = (req, res) => {
    schedule.delete(req.query.name);
    res.json(schedule.schedule);
};

exports.swapPlaces = (req, res) => {
    schedule.delete(req.query.name1, req.query.name2);
    res.json(schedule.schedule);
};

exports.clearShdule = (req, res) => {
    schedule.clear();
    res.json(schedule.schedule);
};
