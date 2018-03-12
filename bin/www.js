'use strict';

const path = require('path');
const { readdirSync } = require('fs');

checkConfig();

const config = require('config');

const app = require('../index');

app.listen(
    config.get('port'),
    () => console.info(`Server start on ${config.get('port')}`)
);

function checkConfig() {
    process.env.NODE_CONFIG_DIR = path.join(path.join(__dirname, '..'), 'config');

    const directoryItems = readdirSync(process.env.NODE_CONFIG_DIR);

    if (directoryItems.map(item => item.split('.')[0]).indexOf(process.env.NODE_ENV) === -1) {
        process.env.NODE_ENV = 'development';
    }
}
