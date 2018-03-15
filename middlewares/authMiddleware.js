import config from '../config'

export default (req, res, next) => {
    if (req.header('Authorization') !== config.AUTH_TOKEN) {
        throw new Error('Unauthorized')
    }

    next()
}
