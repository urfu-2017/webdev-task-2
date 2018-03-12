'use strict'

import uuid from 'uuid/v4'

export default class Spots {
    constructor({ loki }) {
        this.loki = loki
        this.col = this.loki.getCollection('spots') || this.loki.addCollection('spots', { indices: ['id']})
    }

    add(description) {
        const id = uuid()
        const count = this.col.count()
        this.col.insert({ id, description, visited: false, order: count, order2: count })
        return id
    }

    get(sort, page, pageSize) {
        return this.col.chain()
            .offset(pageSize * page)
            .limit(pageSize)
            .simplesort(sort)
            .data().map(({description, visited}) => ({description, visited}))
    }

    search(desc) {
        return this.col.chain()
            .where(x => x.description.includes(desc))
            .data().map(({description, visited}) => ({description, visited}))
    }
    
    // actually it's not a random shuffle but a list reverse
    shuffle() {
        const count = this.col.count() - 1
        this.col.updateWhere(x => true, x => Object.assign({}, x, { order2: count - x.order }))
    }

    delete(id) {
        const spot = this.col.findOne({ id })
        if (spot)
            this.col.remove(spot) 
        return spot
    }

    deleteAll() {
        this.col.clear()
    }

    edit(id, description, visited) {
        const spot = this.col.findOne({ id })
        if (!spot)
            return
        Object.assign(spot, { description, visited })
        this.col.update(spot)
        return { description, visited }
    }
}