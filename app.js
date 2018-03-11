'use strict'

import express from 'express'
import { createContainer } from 'awilix'

export const app = ({ spotsController }) => {
    const result = express()
    result.use('/spots', spotsController)

    return result
}

export const getApp = () => {
    const container = createContainer()
    container.loadModules(['controllers/*.js', 'models/*.js'], { formatName: 'camelCase' })

    return app(container.cradle)
}
