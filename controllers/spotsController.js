'use strict'

import Router from 'express-promise-router'

export default function({ spots }) {
    const router = Router()

    router.post('/', async (req, res) => {
        const { description } = req.body
        const id = spots.add(description)
        res.json({ id })
    })
    router.get('/', async (req, res) => {
        const { sort, page, pageNumber } = req.query
        res.json([])
    })

    return router
}
