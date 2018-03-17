import config from '../config'

export default (req, res, next) => {
    if (req.headers.authorization !== config.AUTH_TOKEN) {
        throw new Error('Unauthorized')
    }

    next()
}
