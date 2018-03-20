/* eslint-disable linebreak-style */
'use strict';

const winston = require('winston');

function getLogger(module) {
    const path = module.filename.split('/').slice(-2)
        .join('/'); // отобразим метку с именем файла, который выводит
    // сообщение

    // eslint-disable-next-line new-cap
    return new winston.createLogger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: path
            })
        ]
    });
}

module.exports = getLogger;
