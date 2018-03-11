'use strict'

import express from 'express'
import { createContainer } from 'awilix'

export const app = ({}) => {
    const result = express()

    result.post('/spots', (req, res) => {
        res.json({ id: 'ae' })
    })

    return result
}

export const getApp = () => {
    const container = createContainer()
    container.loadModules(['controllers/*.js', 'models/*.js'], { formatName: 'camelCase' })
    
    return app(container.cradle)
}
