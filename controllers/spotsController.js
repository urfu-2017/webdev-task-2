'use strict'

import Router from 'express-promise-router'

export default function({}) {
    const router = Router()

    router.post('/', async (req, res) => {
        res.json({ id: 'some' })
    })

    return router
}
