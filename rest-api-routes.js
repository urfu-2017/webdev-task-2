import express from 'express';

import controller from './controllers/rest-api';


const _BASE_PATH = '/sights';
const router = new express.Router();


const _options = (...options) => (req, res) => {
    res.header('Access-Control-Allow-Methods',
        options.join(',') + ',OPTIONS');
    res.sendStatus(204);
};


router.route(_BASE_PATH)
    .get(controller.getAllSights)
    .post(controller.createSight)
    .delete(controller.deleteAllSights)
    .options(_options('GET', 'POST', 'DELETE'));

router.route(_BASE_PATH + '/page/:pageNumber(\\d+)')
    .get(controller.getSightsPage)
    .options(_options('GET'));

router.route(_BASE_PATH + '/:id(\\d+)')
    .get(controller.getSightById)
    .patch(controller.updateSightById)
    .delete(controller.deleteSightById)
    .options(_options('GET', 'PATCH', 'DELETE'));

router.route(_BASE_PATH + '/:id(\\d+)/visited')
    .put(controller.setSightVisitedValue(true))
    .delete(controller.setSightVisitedValue(false))
    .options(_options('PUT', 'DELETE'));

router.route(_BASE_PATH + '/:oldIndex(\\d+)/change-index/:newIndex(\\d+)')
    .put(controller.changeIndex)
    .options(_options('PUT'));

router.route(_BASE_PATH + '/:description(\\w+)')
    .get(controller.findSightByDescription)
    .options(_options('GET'));

router
    .all('*', (req, res) => res.sendStatus(404));


export default router;
