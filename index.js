'use strict';

/*eslint-disable */
let index = async function () {
    const { getApp } = require('./server');
    const app = await getApp();
    app.listen(3000);
}();
/* eslint-enable */
