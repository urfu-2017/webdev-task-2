import all from './all'
import get from './get'
import swap from './swap'
import clear from './clear'
import create from './create'
import update from './update'
import remove from './remove'
import options from './options'

export default {
    all: {
        path: '/',
        method: all
    },
    create: {
        path: '/',
        method: create
    },
    clear: {
        path: '/',
        method: clear
    },
    swap: {
        path: '/',
        method: swap
    },
    options: {
        path: '/',
        method: options
    },
    get: {
        path: '/:uuid',
        method: get
    },
    update: {
        path: '/:uuid',
        method: update
    },
    remove: {
        path: '/:uuid',
        method: remove
    }
}
