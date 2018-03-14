import config from '../config'

const AUTHORIZATION_KEY = 'Authorization'

export default (req, res, next) => {
    if (req.header(AUTHORIZATION_KEY) !== config.AUTH_TOKEN) {
        throw new Error('Unauthorized')
    }

    next()
}
