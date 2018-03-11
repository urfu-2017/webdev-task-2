'use strict';

const { parse: parseUrl } = require('url');
const { parse: parseQuery } = require('querystring');

let DB = [];
let idCounter = 1;

function sortByTime(a, b) {
    return b.createTime - a.createTime;
}

function sortByAlphabet(a, b) {
    let aDesc = a.description.toLowerCase();
    let bDesc = b.description.toLowerCase();
    if (aDesc < bDesc) {
        return -1;
    }
    if (aDesc > bDesc) {
        return 1;
    }

    return 0;
}

exports.getPlaces = (req, res) => {
    const { query } = parseUrl(req.url);
    const { sort } = parseQuery(query);

    var cloneDB = JSON.parse(JSON.stringify(DB));
    if (sort === 'alpha') {
        cloneDB.sort(sortByAlphabet);
    } else if (sort === 'time') {
        cloneDB.sort(sortByTime);
    }

    res.send(JSON.stringify(cloneDB));
};

exports.postPlaces = (req, res) => {
    let { description } = req.body;
    DB.push({
        id: '000' + idCounter,
        createTime: Number(new Date()),
        description: description,
        visited: 'false'
    });
    idCounter++;

    res.sendStatus(201);
};

exports.changeData = (req, res) => {
    let { description, visited } = req.body;
    const id = String(req.params.id);

    for (let i = 0; i < DB.length; i++) {
        if (DB[i].id === id) {
            DB[i].description = description ? description : DB[i].description;
            DB[i].visited = visited === 'true' || visited === 'false' ? visited : DB[i].visited;

            return res.sendStatus(200);
        }
    }

    return res.sendStatus(400);
};

exports.deleteData = (req, res) => {
    const id = String(req.params.id);

    for (let i = 0; i < DB.length; i++) {
        if (DB[i].id === id) {
            DB.splice(i, 1);

            return res.sendStatus(200);
        }
    }

    return res.sendStatus(400);
};

exports.getSearch = (req, res) => {
    const { query } = parseUrl(req.url);
    const { q } = parseQuery(query);

    let re = new RegExp(q, 'i');
    let localDB = [];
    for (let i = 0; i < DB.length; i++) {
        if (DB[i].description.search(re) !== -1) {
            localDB.push(DB[i]);
        }
    }

    res.send(JSON.stringify(localDB));
};

exports.deleteAll = (req, res) => {
    DB = [];

    res.sendStatus(200);
};
