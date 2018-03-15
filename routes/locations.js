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

const router = express.Router()

router.get('/', all)
router.put('/', create)
router.patch('/', swap)
router.delete('/', clear)
router.options('/', options)
router.get('/:uuid', get)
router.post('/:uuid', visit)
router.patch('/:uuid', update)
router.delete('/:uuid', remove)

export default router
