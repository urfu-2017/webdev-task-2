import express from 'express'
import controller from '../controllers/location'

const router = express.Router()

router.get(controller.all.path, controller.all.method)
router.get(controller.get.path, controller.get.method)
router.put(controller.create.path, controller.create.method)
router.patch(controller.update.path, controller.update.method)
router.patch(controller.swap.path, controller.swap.method)
router.delete(controller.clear.path, controller.clear.method)
router.delete(controller.remove.path, controller.remove.method)
router.options(controller.options.path, controller.options.method)

export default router
