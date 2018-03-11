'use strict'

import uuid from 'uuid/v4'

export default class Spots {
    constructor({ loki }) {
        this.loki = loki
        this.col = this.loki.getCollection('spots') || this.loki.addCollection('spots', { indices: ['id']})
    }

    add(description) {
        const id = uuid()
        this.col.insert({ id, description, visited: false })
        return id
    }

    get() {
        return this.col.chain().data()
    }
}