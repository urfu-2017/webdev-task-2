import express from 'express'
import * as controller from '../controllers/location'

const router = express.Router()

router.get('/', controller.all)
router.put('/', controller.create)
router.options('/', controller.options)
router.delete('/', controller.clear)
router.patch('/', controller.swapOrder)
router.get('/:uuid', controller.get)
router.patch('/:uuid', controller.update)
router.delete('/:uuid', controller.remove)

export default router
