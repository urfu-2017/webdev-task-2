require('babel-core/register');
require('babel-polyfill');
const { app } = require('./app');

app.listen(8080, () => {
    console.info('Open http://localhost:8080');
});
