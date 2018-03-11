'use strict'

import Router from 'express-promise-router'

export default function({ spots }) {
    const router = Router()

    router
    .post('/', async (req, res) => {
        const { description } = req.body
        const id = spots.add(description)
        res.json({ id })
    })
    .get('/', async (req, res) => {
        let { sort, page, pageSize } = req.query
        sort = { lex: 'description', date: 'order' }[sort] || 'order2'
        res.json(spots.get(sort, page || 0, pageSize || 20))
    })
    .post('/shuffle', async (req, res) => {
        spots.shuffle()
        res.sendStatus(200)
    })
    .patch('/:id', async (req, res) => {
        const { visited, description } = req.body
        const edited = spots.edit(req.params.id, description, visited)
        if (!edited) {
            res.sendStatus(400)
            return
        }
        res.json(edited)
    })
    .delete('/:id', async (req, res) => {
        res.sendStatus(spots.delete(req.params.id) ? 200 : 400)
    })
    .delete('/all', async (req, res) => {
        spots.deleteAll()
        res.sendStatus(200)
    })

    return router
}
