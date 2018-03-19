'use strict'

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

export class TestApp {
    constructor(app) {
        this.app = app
    }

    r() {
        return chai.request(this.app)
    }

    addSpot(description) {
        return this.r().post('/spots').send({ description })
    }

    getSpots(sort, page, pageSize) {
        return this.r().get('/spots').query({ sort, page, pageSize })
    }

    searchSpot(desc) {
        return this.r().get('/spots/search').query({ desc })
    }

    editSpot(id, visited, description) {
        return this.r().patch(`/spots/${id}`).send({ visited, description })
    }

    deleteSpot(id) {
        return this.r().del(`/spots/${id}`)
    }

    shuffleSpots() {
        return this.r().post('/spots/shuffle')
    }

    deleteAllSpots() {
        return this.r().del('/spots/all')
    }

    swap(idA, idB) {
        return this.r().post(`/spots/${idA}/swap-with`).query({ id: idB })
    }
}
