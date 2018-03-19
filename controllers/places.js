'use strict';

const { Storage } = require('../models/places');
const OK_RESPONSE = { ok: true };
const ERROR_RESPONSE = { ok: false };

class PlacesController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    createPlace() {
        const storage = new Storage();
        const query = this.req.body;
        const id = storage.add(query.description);

        this.res.status(201).json({ ...OK_RESPONSE, id });
    }

    listPlaces() {
        const storage = new Storage();
        const sortParameter = this.req.query.sort;
        const places = storage.list(sortParameter);
        if (!places) {
            this.res.status(204);
        } else {
            this.res.json({ ...OK_RESPONSE, places });
        }
    }

    listByPages() {
        const storage = new Storage();
        const sortParam = this.req.params.sort;
        const pageSize = Number(this.req.params.size);
        const pageNumber = Number(this.req.params.number);
        const places = storage.listByPages(sortParam, pageSize, pageNumber);
        if (!places) {
            this.res.sendStatus(204);
        }
        this.res.json({ ...OK_RESPONSE, places });
    }

    findByDescription() {
        const storage = new Storage();
        const query = this.req.query.q;
        if (!query) {
            this.res.sendStatus(204);
        }
        const place = storage.searchByDescription(query);
        if (!place) {
            this.res.status(404).json(ERROR_RESPONSE);
        }
        this.res.json({ ...OK_RESPONSE, place });
    }

    changeDescription() {
        const storage = new Storage();
        const id = Number(this.req.params.id);
        if (!this.req.body.description) {
            this.res.status(400).json(ERROR_RESPONSE);
        }
        try {
            storage.changeDescription(id, this.req.body.description);
            this.res.json(OK_RESPONSE);
        } catch (ex) {
            console.error(ex);
            this.res.status(404).json(ERROR_RESPONSE);
        }
    }

    toggleVisited() {
        const storage = new Storage();
        const id = Number(this.req.params.id);
        if (!this.req.body.visited) {
            this.res.status(400).json(ERROR_RESPONSE);
        }
        try {
            storage.toggleVisited(id, Boolean(this.req.body.visited));
            this.res.json(OK_RESPONSE);
        } catch (ex) {
            console.error(ex);
            this.res.status(404).json(ERROR_RESPONSE);
        }
    }

    deletePlace() {
        const storage = new Storage();
        const id = Number(this.req.params.id);
        try {
            storage.deletePlace(id);
            this.res.json(OK_RESPONSE);
        } catch (ex) {
            console.error(ex);
            this.res.status(404).json(ERROR_RESPONSE);
        }
    }

    swap() {
        const storage = new Storage();
        const firstId = Number(this.req.params.id1);
        const secondId = Number(this.req.params.id2);
        try {
            const { newFirstId, newSecondId } = storage.swapPlaces(firstId, secondId);
            this.res.json({ ...OK_RESPONSE, firstId: newFirstId, secondId: newSecondId });
        } catch (ex) {
            console.error(ex);
            this.res.status(404).json(ERROR_RESPONSE);
        }
    }

    deletePlaces() {
        const storage = new Storage();
        storage.clear();
        this.res.json(OK_RESPONSE);
    }

}

exports.PlacesController = PlacesController;
