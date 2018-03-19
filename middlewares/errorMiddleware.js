import { UNAUTHORIZED, BAD_REQUEST } from 'http-status-codes'

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
    switch (err.message) {
        case 'Unauthorized':
            res.sendStatus(UNAUTHORIZED)
            break
        default:
            res.status(BAD_REQUEST).json({
                error: err.message,
                message: 'Use the OPTIONS method to find out the Location scheme.'
            })
    }
}
