import express from 'express'
import { NOT_FOUND } from 'http-status-codes'

import config from './config'
import setupMiddlewares from './middlewares'
import errorMiddleware from './middlewares/errorMiddleware'
import locationsRouter from './routes/locations'

const app = express()

setupMiddlewares(app)
    .use('/locations', locationsRouter)
    .use('*', (_, res) => res.sendStatus(NOT_FOUND))
    .use(errorMiddleware)
    .listen(config.PORT)
