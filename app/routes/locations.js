import express from 'express'

import all from '../controllers/location/all'
import get from '../controllers/location/get'
import swap from '../controllers/location/swap'
import clear from '../controllers/location/clear'
import visit from '../controllers/location/visit'
import create from '../controllers/location/create'
import update from '../controllers/location/update'
import remove from '../controllers/location/remove'
import options from '../controllers/location/options'

const router = express.Router() //eslint-disable-line

router.get('/', all)
router.put('/', create)
router.patch('/', swap)
router.delete('/', clear)
router.options('/', options)
router.get('/:id', get)
router.post('/:id', visit)
router.patch('/:id', update)
router.delete('/:id', remove)

export default router
