/* eslint-disable linebreak-style */
'use strict';
const noteRoutes = require('./routes');

module.exports = function (app) {
    noteRoutes(app);
    // Тут, позже, будут и другие обработчики маршрутов
};
