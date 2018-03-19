import { error404 } from './controllers/errors';
import * as placesController from './controllers/places';

exports.routes = app => {
    app.get('/', placesController.list);

    app
        .route('/places')
        .post(placesController.create)
        .get(placesController.list)
        .delete(placesController.deleteAll);

    app.route('/places/name/:name')
        .delete(placesController.deletePlace)
        .put(placesController.changeDescription)
        .patch(placesController.isVisited);
    app.get('/places/search/:description', placesController.find);

    app.put('/places/sort/date', placesController.sortByDate);
    app.put('/places/sort/abc', placesController.sortByAbc);
    app.put('/places/order', placesController.switchOrder);
    app.put('/places/pages/:[1-9]+', placesController.onNewPage);

    app.all('*', error404);
};
