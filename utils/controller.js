'use strict';

const ServerError = require('../utils/server-error');

module.exports = class {
    constructor(req, res, next) {
        this.next = next;
        this.body = req.body;
        this.query = req.query;
        this.params = req.params;
        this.json = res.json.bind(res);
        this.end = res.end.bind(res);
    }

    get() {
        this.next();
    }

    post() {
        this.next();
    }

    put() {
        this.next();
    }

    delete() {
        this.next();
    }

    static toController() {
        return (req, res, next) => {
            try {
                let Controller = this;
                let instance = new Controller(req, res, next);
                instance[req.method.toLowerCase()]();
            } catch (e) {
                if (e instanceof ServerError) {
                    res.status(e.status).json({ error: e.message });
                } else {
                    throw e;
                }
            }
        };
    }
};
