const {
  create, list, search, update, remove,
} = require('./controllers/records');
const express = require('express');

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
  res.json({ message: 'welcome to the api' });
});

apiRoutes.route('/record')
  .get(list)
  .put(update)
  .delete(remove)
  .post(create);

apiRoutes.route('/search')
  .get(search);

module.exports = apiRoutes;
