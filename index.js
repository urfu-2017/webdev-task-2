'use strict'

require('babel-core/register')
const { getApp } = require('./app')

if (require.main === module) {
    getApp().listen(8080, () => console.log('Running on http://localhost:8080'))
}
