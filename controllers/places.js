'use strict';

import { PlacesRepository } from '../models/placesRepositiry';

const repository = new PlacesRepository()

export class PlacesController {
    static async add (req, res) {
        const place = repository.add(req.body);
        res.send(place);
    }
    static async list(req, res) {
        res.send(repository.list(req.body));
    }
    static async search(req, res) {
        const place = repository.searchByName(req.body);
        res.send(place);
    }
    static async edit(req, res) {
        const place = repository.editNameToId({id: req.params.id, name: req.body.name});
        res.send(place);
    }
    static async setVisited(req, res) {
        const place = repository.changeVisitedById({ id: req.params.id, isVisited: true });
        res.send(place);
    }
    static async setUnvisited(req, res) {
        const place = repository.changeVisitedById({ id: req.params.id, isVisited: false });
        res.send(place);
    }
    static async delete(req, res) {
        const isFound = repository.delete(req.params);
        res.send({
            isFound: isFound
        });
    }
    static async changePriority(req, res) {
        repository.changePriority({id: req.params.id, priority: req.body.priority});
        res.send({});
    }
    static async clear(req, res) {
        repository.clear();
        res.send({});
    }
}
