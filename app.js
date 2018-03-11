'use strict'

import express from 'express'
import { createContainer, asValue } from 'awilix'
import Loki from 'lokijs'

export const app = ({ spotsController }) => {
    const result = express()
    result.use('/spots', spotsController)

    return result
}

export const getApp = () => {
    const container = createContainer()
    container.register('loki', asValue(new Loki()))
    container.loadModules(['controllers/*.js', 'models/*.js'], { formatName: 'camelCase' })

    return app(container.cradle)
}
