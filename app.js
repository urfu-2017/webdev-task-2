import express from 'express'

import config from './config'
import setupMiddlewares from './middlewares'
import errorMiddleware from './middlewares/errorMiddleware'
import locationsRouter from './routes/locations'

const app = express()

setupMiddlewares(app)

app.use('/locations', locationsRouter)
app.use(errorMiddleware).listen(config.PORT)
