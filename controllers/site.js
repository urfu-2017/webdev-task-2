'use strict';

const SiteRepository = require('../site-repository');
const repo = new SiteRepository();

exports.create = (req, res) => {
    const site = req.body;
    if (!site.name || !site.description) {
        res.sendStatus(400);
    }

    res.json(repo.add(site));
};

exports.edit = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.sendStatus(400);
    }

    const { description, isVisited } = req.body;

    try {
        const site = repo.getById(id);
        site.description = description || site.description;
        site.isVisited = isVisited || site.isVisited;

        res.json(repo.update(id, site));
    } catch (err) {
        res.sendStatus(404);
    }

};

exports.findBy = (req, res) => {
    const { description } = req.query;

    res.json(repo.findByDescription(description));
};

exports.get = (req, res) => {
    const options = req.query;

    const result = repo.get(options);
    res.json(result);
};

exports.shuffle = (req, res) => {
    repo.shuffle();

    res.sendStatus(204);
};

exports.delete = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.sendStatus(400);
    }

    try {
        repo.delete(id);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(404);
    }

};

exports.deleteAll = (req, res) => {
    repo.deleteAll();

    res.sendStatus(204);
};
