import bodyParser from 'body-parser'
import authMiddleware from './authMiddleware'

export default (app) => {
    app.use(authMiddleware)
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    return app
}
