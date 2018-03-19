'use strict'

import Router from 'express-promise-router'

export default ({ spots }) =>
    Router()
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
    .get('/search', async (req, res) => {
        let { desc } = req.query
        res.json(spots.search(desc))
    })
    .post('/shuffle', async (req, res) => {
        spots.shuffle()
        res.sendStatus(200)
    })
    .post('/:id/swap-with', async (req, res) => {
        const idA = req.query.id
        const idB = req.params.id
        res.sendStatus(spots.swap(idA, idB) ? 200 : 400)
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
    .delete('/all', async (req, res) => {
        spots.deleteAll()
        res.sendStatus(200)
    })
    .delete('/:id', async (req, res) => {
        res.sendStatus(spots.delete(req.params.id) ? 200 : 400)
    })
