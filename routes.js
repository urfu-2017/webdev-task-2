import { error404 } from './controllers/errors';
import { list,
    create,
    changeDescription,
    isVisited,
    deletePlace,
    deleteAll,
    find,
    sortByDate,
    sortByAbc,
    changeOrder,
    onNewPage } from './controllers/places';

exports.routes = app => {
    app.get('/', list);

    app
        .route('/places')
        .post(create)
        .get(list)
        .delete(deleteAll);

    app.route('/places/:description')
        .delete(deletePlace)
        .get(find)
        .put(changeDescription)
        .patch(isVisited);

    app.put('/places/sort/date', sortByDate);
    app.put('/places/sort/abc', sortByAbc);
    app.put('/change', changeOrder);
    app.put('/places/pages/:page', onNewPage);

    app.all('*', error404);
};
