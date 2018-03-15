import express from 'express'

import config from './config'
import setupMiddlewares from './middlewares'
import errorMiddleware from './middlewares/errorMiddleware'
import locationsRouter from './routes/locations'

const app = express()

setupMiddlewares(app)
    .use('/locations', locationsRouter)
    .use(errorMiddleware)
    .listen(config.PORT)
