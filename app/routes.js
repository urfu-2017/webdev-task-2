const { error404 } = require('./controllers/errors');
const {
  create, list, search, update,
} = require('./controllers/records');
const express = require('express');

const apiRoutes = express.Router();

apiRoutes.use((req, res, next) => {
  console.log('Time: ', Date.now());
  console.log('Req: ', req.method);
  next();
});

apiRoutes.get('/', (req, res) => {
  res.json({ message: 'welcome to the api' });
});

apiRoutes.route('/record')
  .get(list)
  .put(update)
  .post(create);

apiRoutes.route('/search')
  .get(search);

const otherRoutes = (app) => {
  app.all('*', error404);
};

module.exports = { apiRoutes, otherRoutes };
